import math
def solveQuad(af,bf,cf):
    try :
        a = float (af)
        b = float (bf)
        c = float (cf)
        dis = (b**2)  -(4*a*c)
        root1 =None
        root2 = None
        if dis < 0 :
            print("solution is imaginary...roots not exist")
        elif dis == 0 :
            print("single real root exist")
            root1 = (-b)/(2*a)
            root2 = root1
        else :
            print("two distict real root exist")
            root1 = ((-b) + math.sqrt(dis))/(2*a)
            root2 = ((-b) - math.sqrt(dis))/(2*a)
    except ValueError :
        print("Error : input must be valid number")
    except ZeroDivisionError :
        print("Error! variable A should be non Zero")
    else :
        return [root1,root2]



print("Please provide a,b and c for finding x (ax^2 + bx + c = 0) : ")
a = input("Enter a : ")
b = input("Enter b : ")
c = input("Enter c : ")

print(f"Equation : {a}x^2 + {b}x + {c} = 0")
print(f"Value of x is : {solveQuad(a,b,c)}")