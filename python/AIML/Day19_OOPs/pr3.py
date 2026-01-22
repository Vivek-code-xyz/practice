class rectangle :

    def __init__(self,l,b):
        self.length = l
        self.breadth = b

    def area(self):
        print(f"area of the rectange : {self.length*self.breadth}")

    def perimeter(self):
        print(f"perimeter of rectangle : {2*(self.length + self.breadth)}")
        


r1 = rectangle(35,6)
r1.area()
r1.perimeter()