const chai = require('chai');
const expect = chai.expect;

const Account = require('./account');
const SavingsAccount = require('./savingsaccount');
const CheckingAccount = require('./checkingaccount');
const Bank = require('./bank');

describe('Banking System Tests', () => {
    describe('Account Class', () => {
        let acc;
        beforeEach(() => {
            acc = new Account(1);
        });

        it('should initialize with correct values', () => {
            expect(acc.getNumber()).to.equal(1);
            expect(acc.getBalance()).to.equal(0);
        });

        it('should deposit amount correctly', () => {
            acc.deposit(100);
            expect(acc.getBalance()).to.equal(100);
        });

        it('should throw error on invalid deposit amount', () => {
            expect(() => acc.deposit(-50)).to.throw(RangeError, "Deposit amount has to be greater than zero");
        });

        it('should withdraw amount correctly', () => {
            acc.deposit(100);
            acc.withdraw(50);
            expect(acc.getBalance()).to.equal(50);
        });

        it('should throw error on invalid withdraw amount', () => {
            expect(() => acc.withdraw(-50)).to.throw(RangeError, "Withdraw amount has to be greater than zero");
        });

        it('should throw error on insufficient funds', () => {
            expect(() => acc.withdraw(50)).to.throw(Error, "Insufficient funds");
        });

        it('should return correct string representation', () => {
            expect(acc.toString()).to.equal('Account 1: balance 0');
        });

        it('endOfMonth should return empty string', () => {
            expect(acc.endOfMonth()).to.equal('');
        });
    });

    describe('SavingsAccount Class', () => {
        let savAcc;
        beforeEach(() => {
            savAcc = new SavingsAccount(1, 5);
        });

        it('should initialize with correct values', () => {
            expect(savAcc.getNumber()).to.equal(1);
            expect(savAcc.getBalance()).to.equal(0);
            expect(savAcc.getInterest()).to.equal(5);
        });

        it('should add interest correctly', () => {
            savAcc.deposit(100);
            savAcc.addInterest();
            expect(savAcc.getBalance()).to.equal(105);
        });

        it('should return correct string representation', () => {
            expect(savAcc.toString()).to.equal('SavingsAccount 1: balance 0 interest 5');
        });

        it('endOfMonth should return correct string', () => {
            savAcc.deposit(100);
            expect(savAcc.endOfMonth()).to.equal('Interest added SavingsAccount 1: balance: 105 interest: 5');
        });
    });

    describe('CheckingAccount Class', () => {
        let chkAcc;
        beforeEach(() => {
            chkAcc = new CheckingAccount(1, 500);
        });

        it('should initialize with correct values', () => {
            expect(chkAcc.getNumber()).to.equal(1);
            expect(chkAcc.getBalance()).to.equal(0);
            expect(chkAcc.getOverdraftLimit()).to.equal(500);
        });

        it('should withdraw amount correctly within overdraft limit', () => {
            chkAcc.withdraw(100);
            expect(chkAcc.getBalance()).to.equal(-100);
        });

        it('should throw error when overdraft limit exceeded', () => {
            chkAcc.withdraw(100);
            expect(() => chkAcc.withdraw(500)).to.throw(Error, "Insufficient funds, overdraft limit reached");
        });

        it('should return correct string representation', () => {
            expect(chkAcc.toString()).to.equal('CheckingAccount 1: balance 0 overdraft limit 500');
        });

        it('endOfMonth should return correct string for low balance', () => {
            chkAcc.withdraw(100);
            expect(chkAcc.endOfMonth()).to.equal('Warning, low balance CheckingAccount 1: balance: -100 overdraft limit: 500');
        });
    });

    describe('Bank Class', () => {
        let bank;
        beforeEach(() => {
            bank = new Bank();
        });

        it('should add accounts correctly', () => {
            let accNumber = bank.addAccount();
            expect(accNumber).to.equal(1);
            let savAccNumber = bank.addSavingsAccount(5);
            expect(savAccNumber).to.equal(2);
            let chkAccNumber = bank.addCheckingAccount(500);
            expect(chkAccNumber).to.equal(3);
        });

        it('should close accounts correctly', () => {
            let accNumber = bank.addAccount();
            bank.closeAccount(accNumber);
            expect(bank.accountReport()).to.equal('');
        });

        it('should return correct account report', () => {
            bank.addAccount();
            bank.addSavingsAccount(5);
            bank.addCheckingAccount(500);
            expect(bank.accountReport()).to.equal(
                'Account 1: balance 0\nSavingsAccount 2: balance 0 interest 5\nCheckingAccount 3: balance 0 overdraft limit 500'
            );
        });

        it('endOfMonth should return correct report', () => {
            bank.addAccount();
            let savAccNumber = bank.addSavingsAccount(5);
            let chkAccNumber = bank.addCheckingAccount(500);
            let savAcc = bank._accounts.find(acc => acc.getNumber() === savAccNumber);
            let chkAcc = bank._accounts.find(acc => acc.getNumber() === chkAccNumber);
            savAcc.deposit(100);
            chkAcc.withdraw(100);
            expect(bank.endOfMonth()).to.equal(
                'Interest added SavingsAccount 2: balance: 105 interest: 5\nWarning, low balance CheckingAccount 3: balance: -100 overdraft limit: 500'
            );
        });
    });
});
