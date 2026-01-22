#self is first parameter to any method inside a class

class stu :
    def __init__(self,name,age):
        self.name = name
        self.age = age
    
    def greet(self):
        print("Hello "+self.name+" How are you..")

    def info(self):
        self.greet()
        print(f"your age is {self.age} years")


s1 = stu("het",45)

s1.info()