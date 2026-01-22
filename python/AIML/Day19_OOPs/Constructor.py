# __init__() is the constructure for any class

class human :
    def __init__(this,name,age,gender):
        this.name = name
        this.age = age
        this.gender = gender


p1 = human("vivek",23,"male")

print(p1.name,p1.age,p1.gender,sep=" | ")
        
#------------------------------------------------------------------------

class person :
    type = "Human"       #this is class attribute or variable shared by all objects

    def __init__(self,name,age):
        self.name = name
        self.age= age   #this are instance variable...unique for each objects


p1 =  person("vivek",67)
p2 =  person("prince",66)

print(p1.type,p1.name)
print(p2.type,p2.name)
               