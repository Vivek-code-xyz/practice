class BankAcc :

    def __init__(self):
        self.bal = 0
    
    def deposite(self,val):
        self.bal+=val
        print(f"{val} is added successfully to the account")
    

    def withdraw(self,val):
        if val > self.bal : 
            print("insufficient Balance..")
        else :
            self.bal -=val
            print(f"{val} is successfully withdraws from your account")

    def checkbal(self):
        print(f"current balance is : {self.bal}")




ac1 = BankAcc()
ac1.deposite(2000)
ac1.withdraw(1200)
ac1.checkbal()  


ac2 = BankAcc()
ac2.checkbal()