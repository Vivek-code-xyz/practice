class shape :
    def __init__(self,angle):
        self.a =angle
       
        

class circle(shape):
    def __init__(self, angle,radious):
        super().__init__(angle)
        self.radius = radious

class square(shape):
    def __init__(self, angle,edges):
        super().__init__(angle)
        self.edges = edges


# Create objects
c1 = circle(0, 7)        # circle with 0 angle, radius 7
c2 = circle(45, 3.5)    # circle with 45 degree, radius 3.5

s1 = square(90, 4)      # square with 90 degree, 4 edges
s2 = square(30, 6)      # square with 30 degree, 6 edges (just for testing)

# Print data
print("Circle 1:", c1.a, c1.radius)
print("Circle 2:", c2.a, c2.radius)

print("Square 1:", s1.a, s1.edges)
print("Square 2:", s2.a, s2.edges)
