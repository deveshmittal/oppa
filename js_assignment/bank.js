const Account = require('./account.js');
const SavingsAccount = require('./savingsaccount.js');
const CheckingAccount = require('./checkingaccount.js');

class Bank {
    static nextNumber = 1;

    constructor() {
        this.accounts = [];
    }

    addAccount() {
        const account = new Account(Bank.nextNumber++);
        this.accounts.push(account);
        return account.getNumber();
    }

    addSavingsAccount(interest) {
        const account = new SavingsAccount(Bank.nextNumber++, interest);
        this.accounts.push(account);
        return account.getNumber();
    }

    addCheckingAccount(overdraft) {
        const account = new CheckingAccount(Bank.nextNumber++, overdraft);
        this.accounts.push(account);
        return account.getNumber();
    }

    closeAccount(number) {
        this.accounts = this.accounts.filter(account => account.getNumber() !== number);
    }

    accountReport() {
        return this.accounts.map(account => account.toString()).join('\n');
    }

    endOfMonth() {
        return this.accounts.map(account => account.endOfMonth()).filter(report => report !== "").join('\n');
    }
}

module.exports = Bank;
