# use  __ before any variable or function name to make it private
#use _ before any variable or function name to make it protective
#both are can not accessed by outside class
# protected attribute can be inherited but private not..
# private function can not accessed by outside class..but can be accessed by inside methods


class human:
    def __init__(self,name,age,gender,OTP=None):
        self.name = name
        self._age = age    #age is protected variablenow
        self.__gender = gender     #gender is private now
        if OTP == None : raise ValueError("Password Must be set One time")
        else : self.__pass = OTP

    def get_age(self):         #this is called getter function for accessing private attributes
        return self._age
    def get_gender(self):
        return self.__gender
        
    def set_age(self,newage):          #setter functions
        self._age = newage
    def swap_gender(self):
        self.__gender = "M" if self.__gender.lower() =="f" else "F"

    def __Auth(self,password):
        if(self.__pass == password) : return True
        else: return False
       
    def get_info (self):
        Otp = int(input("Enter 4 digit OTP : "))
        if self.__Auth(Otp):     # must use self
            print(f"Name: {self.name}")
        else:
            print("Invalid OTP")


try:
    # create object
    h1 = human("Vivek", 21, "M", OTP=1234)
    print("Human created successfully!\n")

    # test getters
    print("Age:", h1.get_age())
    print("Gender:", h1.get_gender())

    # test setter
    h1.set_age(25)
    print("Updated Age:", h1.get_age())

    # test swap gender
    h1.swap_gender()
    print("Gender after swap:", h1.get_gender())

    print("\n--- AUTH TEST ---")
    h1.get_info()   # enter OTP when asked (try 1234 and wrong one)

except ValueError as e:
    print("Error:", e)
