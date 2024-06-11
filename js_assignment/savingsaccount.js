const Account = require('./account');

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
        let interestAmount = this.getBalance() * this._interest / 100;
        this.deposit(interestAmount);
        return interestAmount;
    }

    toString() {
        return `SavingsAccount ${this.getNumber()}: balance ${this.getBalance()} interest ${this._interest}`;
    }

    endOfMonth() {
        let interest = this.addInterest();
        return `Interest added SavingsAccount ${this.getNumber()}: balance: ${this.getBalance()} interest: ${interest}`;
    }
}

module.exports = SavingsAccount;
