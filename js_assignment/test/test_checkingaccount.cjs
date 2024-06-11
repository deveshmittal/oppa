const chai = require('chai');
const expect = chai.expect;
const CheckingAccount = require('../checkingaccount.js');

describe('CheckingAccount', function() {
    let checkingAccount;

    beforeEach(function() {
        checkingAccount = new CheckingAccount(1, 500);
    });

    it('should have an overdraft limit', function() {
        expect(checkingAccount.getOverdraftLimit()).to.equal(500);
    });

    it('should set an overdraft limit', function() {
        checkingAccount.setOverdraftLimit(1000);
        expect(checkingAccount.getOverdraftLimit()).to.equal(1000);
    });

    it('should withdraw money within overdraft limit', function() {
        checkingAccount.deposit(100);
        checkingAccount.withdraw(200);
        expect(checkingAccount.getBalance()).to.equal(-100);
    });

    it('should throw an error for insufficient funds with overdraft limit exceeded', function() {
        expect(() => checkingAccount.withdraw(600)).to.throw(Error);
    });

    it('should return string representation', function() {
        expect(checkingAccount.toString()).to.equal('CheckingAccount 1: balance 0 overdraft limit 500');
        checkingAccount.deposit(100);
        expect(checkingAccount.toString()).to.equal('CheckingAccount 1: balance 100 overdraft limit 500');
    });

    it('should return end of month report', function() {
        checkingAccount.deposit(100);
        checkingAccount.withdraw(200);
        expect(checkingAccount.endOfMonth()).to.equal('Warning, low balance CheckingAccount 1: balance: -100 overdraft limit: 500');
    });
});
