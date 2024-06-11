const Account = require('./account.js');

class SavingsAccount extends Account {
    constructor(number, interest) {
        super(number);
        this._interest = interest;
    }

    getInterest() {
        return this._interest;
    }

    setInterest(interest) {
        this._interest = interest;
    }

    addInterest() {
        const interestAmount = (this.getBalance() * this._interest) / 100;
        this.deposit(interestAmount);
    }

    toString() {
        return `SavingsAccount ${this.getNumber()}: balance ${this.getBalance()} interest ${this._interest}`;
    }

    endOfMonth() {
        this.addInterest();
        return `Interest added SavingsAccount ${this.getNumber()}: balance: ${this.getBalance()} interest: ${this._interest}`;
    }
}

module.exports = SavingsAccount;
