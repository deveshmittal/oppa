const Account = require('./account.js');

class CheckingAccount extends Account {
    constructor(number, overdraftLimit) {
        super(number);
        this._overdraftLimit = overdraftLimit;
    }

    getOverdraftLimit() {
        return this._overdraftLimit;
    }

    setOverdraftLimit(overdraftLimit) {
        this._overdraftLimit = overdraftLimit;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new RangeError("Withdraw amount has to be greater than zero");
        }
        if (amount > this._balance + this._overdraftLimit) {
            throw Error("Insufficient funds, overdraft limit exceeded");
        }
        this._balance -= amount;
    }

    toString() {
        return `CheckingAccount ${this.getNumber()}: balance ${this.getBalance()} overdraft limit ${this._overdraftLimit}`;
    }

    endOfMonth() {
        if (this.getBalance() < 0) {
            return `Warning, low balance CheckingAccount ${this.getNumber()}: balance: ${this.getBalance()} overdraft limit: ${this._overdraftLimit}`;
        }
        return "";
    }
}

module.exports = CheckingAccount;
