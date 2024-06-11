const Account = require('./account');
const SavingsAccount = require('./savingsaccount');
const CheckingAccount = require('./checkingaccount');

class Bank {
    static nextNumber = 1;

    constructor() {
        this._accounts = [];
    }

    addAccount() {
        const newAccount = new Account(Bank.nextNumber++);
        this._accounts.push(newAccount);
        return newAccount.getNumber();
    }

    addSavingsAccount(interest) {
        const newAccount = new SavingsAccount(Bank.nextNumber++, interest);
        this._accounts.push(newAccount);
        return newAccount.getNumber();
    }

    addCheckingAccount(overdraft) {
        const newAccount = new CheckingAccount(Bank.nextNumber++, overdraft);
        this._accounts.push(newAccount);
        return newAccount.getNumber();
    }

    closeAccount(number) {
        this._accounts = this._accounts.filter(acc => acc.getNumber() !== number);
    }

    accountReport() {
        return this._accounts.map(acc => acc.toString()).join("\n");
    }

    endOfMonth() {
        return this._accounts.map(acc => acc.endOfMonth()).filter(report => report !== "").join("\n");
    }
}

module.exports = Bank;
