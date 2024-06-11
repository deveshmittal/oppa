const chai = require('chai');
const expect = chai.expect;
const Bank = require('../bank.js');
const Account = require('../account.js');
const SavingsAccount = require('../savingsaccount.js');
const CheckingAccount = require('../checkingaccount.js');

describe('Bank', function() {
    let bank;

    beforeEach(function() {
        bank = new Bank();
    });

    it('should add an account', function() {
        const number = bank.addAccount();
        expect(number).to.equal(1);
        expect(bank.accounts.length).to.equal(1);
        expect(bank.accounts[0]).to.be.instanceOf(Account);
    });

    it('should add a savings account', function() {
        const number = bank.addSavingsAccount(5);
        expect(number).to.equal(2);
        expect(bank.accounts.length).to.equal(1);
        expect(bank.accounts[0]).to.be.instanceOf(SavingsAccount);
    });

    it('should add a checking account', function() {
        const number = bank.addCheckingAccount(500);
        expect(number).to.equal(3);
        expect(bank.accounts.length).to.equal(1);
        expect(bank.accounts[0]).to.be.instanceOf(CheckingAccount);
    });

    it('should close an account', function() {
        const number = bank.addAccount();
        bank.closeAccount(number);
        expect(bank.accounts.length).to.equal(0);
    });

});
