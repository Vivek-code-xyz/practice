class employee:
    def __init__(self,a,b,c):
        self.name = a
        self.id = b
        self._salary = c


class Manager(employee):
    def __init__(self, a, b, c,d):
        super().__init__(a, b, c)
        self.team_size = d

    def bonus(self):
       return self._salary*0.15
        


class Developer(employee):
    def __init__(self, a, b, c ,d):
        super().__init__(a, b, c)
        self.programming_lang = d

    def bonus(self):
       return self._salary*0.10
    


m1 = Manager("Amit", 101, 50000, 10)
d1 = Developer("Riya", 102, 40000, "Python")

print("Manager Salary:", m1._salary)
print("Manager Bonus:", m1.bonus())

print("Developer Salary:", d1._salary)
print("Developer Bonus:", d1.bonus())
