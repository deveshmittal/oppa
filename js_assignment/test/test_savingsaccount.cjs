const chai = require('chai');
const expect = chai.expect;
const SavingsAccount = require('../savingsaccount.js');

describe('SavingsAccount', function() {
    let savingsAccount;

    beforeEach(function() {
        savingsAccount = new SavingsAccount(1, 5);
    });

    it('should have an interest rate', function() {
        expect(savingsAccount.getInterest()).to.equal(5);
    });

    it('should set an interest rate', function() {
        savingsAccount.setInterest(10);
        expect(savingsAccount.getInterest()).to.equal(10);
    });

    it('should add interest to the balance', function() {
        savingsAccount.deposit(100);
        savingsAccount.addInterest();
        expect(savingsAccount.getBalance()).to.equal(105);
    });

    it('should return string representation', function() {
        expect(savingsAccount.toString()).to.equal('SavingsAccount 1: balance 0 interest 5');
        savingsAccount.deposit(100);
        expect(savingsAccount.toString()).to.equal('SavingsAccount 1: balance 100 interest 5');
    });

    it('should return end of month report', function() {
        savingsAccount.deposit(100);
        expect(savingsAccount.endOfMonth()).to.equal('Interest added SavingsAccount 1: balance: 105 interest: 5');
    });
});
