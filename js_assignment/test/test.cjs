const chai = require('chai');
const expect = chai.expect;
const Account = require('../account.js');

describe('Account', function() {
    let account;

    beforeEach(function() {
        account = new Account(1);
    });

    it('should have a number', function() {
        expect(account.getNumber()).to.equal(1);
    });

    it('should have an initial balance of 0', function() {
        expect(account.getBalance()).to.equal(0);
    });

    it('should deposit money', function() {
        account.deposit(100);
        expect(account.getBalance()).to.equal(100);
    });

    it('should throw an error for deposit <= 0', function() {
        expect(() => account.deposit(0)).to.throw(RangeError);
        expect(() => account.deposit(-100)).to.throw(RangeError);
    });

    it('should withdraw money', function() {
        account.deposit(100);
        account.withdraw(50);
        expect(account.getBalance()).to.equal(50);
    });

    it('should throw an error for withdraw <= 0', function() {
        expect(() => account.withdraw(0)).to.throw(RangeError);
        expect(() => account.withdraw(-100)).to.throw(RangeError);
    });

    it('should throw an error for insufficient funds', function() {
        expect(() => account.withdraw(100)).to.throw(Error);
    });

    it('should return string representation', function() {
        expect(account.toString()).to.equal('Account 1: balance 0');
        account.deposit(100);
        expect(account.toString()).to.equal('Account 1: balance 100');
    });
});
