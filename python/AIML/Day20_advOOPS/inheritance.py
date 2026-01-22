class person :
    def __init__(self,gender,name,age):
        self.gender = gender
        self.name = name
        self.age = age

    def personinfo(self):
        print(f"Name : {self.name} | age = {self.age} | gender : {self.gender}")

class student(person):
    def __init__(self, gender, name, age,gryear):
        super().__init__(gender, name, age)   #this is parents constructor is called cause python do method overriding..means child method overrides the parent method(this case __init__ method of person is overrided by student class's __init__)
        self.GraduationYear = gryear

    def studentinfo(self):
        self.personinfo()
        print(F"Graduation Year : {self.GraduationYear}")
    def welcome(self):
        print(f"Welcome {self.name} You are now In year {self.GraduationYear}")   

st1 = student("male","Vivek",18,"2028")

st1.personinfo()
st1.welcome()