class BankAccount {
    private double balance;
    private String accountNumber; // Public method - user doesn't know how withdrawal works

    public boolean withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            return true;
            // Abstracted details hidden
        }
        return false;
    } // Public method - user just calls it

    public void deposit(double amount) {
        balance += amount;
    } // Public method

    public double getBalance() {
        return balance;
    } // Internal methods (private) - implementation details

    private boolean validateAccount() { // Complex validation logic
        return true;
    }

    private void updateLedger(double amount) {
    }
}
