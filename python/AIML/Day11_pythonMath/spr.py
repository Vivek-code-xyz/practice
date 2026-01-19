import math

def solveLinear(af,bf,cf) :
    try :
        a = int (af)
        b = int (bf)
        c = int (cf)
        ans = (c-b)/a
    except ValueError :
        print("Error : input must be valid number")
    except ZeroDivisionError :
        print("Error! variable A should be non Zero")
    else :
        return ans
    

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


def compundInt (pf,rf,nf,tf) :
    try :
        p = round(float(pf),2)
        r = round(float(rf)/100,4)
        n = round(float(nf),2)
        t = round(float(tf),4)
        if n==0 :
            raise ZeroDivisionError
        
        ans = p *(math.pow((1 + (r/n)),(n*t)))
    except ValueError :
        print("Error : input must be valid number")
    except ZeroDivisionError :
        print("Error! variable A should be non Zero")
    else :
        return round(ans,2)



while True :
    print("-------------Menu---------------")
    print("1 : to solve linear equation")
    print("2 : to solve quadratic equation")
    print("3 : to calculate compout interest")
    print("4: to exit the menu")
    print("--------------------------------")
    try:
        choice = int(input("Enter your choice : "))
    except ZeroDivisionError :
        print("Choice should be non Zero")
    except TypeError:
        print("Invalid type in choice")
    except ValueError:
        print("invalid Value in choice")
    else :
        if choice > 4 :
            print("invalid option selected")
            continue
        elif choice == 1:
            print("Please provide a,b and c for finding x (ax+b=c) : ")
            a = input("Enter a : ")
            b = input("Enter b : ")
            c = input("Enter c : ")

            print(f"Equation : {a}x + {b} = {c}")
            print(f"Value of x is : {solveLinear(a,b,c)}")
        elif choice == 2 :
            print("Please provide a,b and c for finding x (ax^2 + bx + c = 0) : ")
            a = input("Enter a : ")
            b = input("Enter b : ")
            c = input("Enter c : ")

            print(f"Equation : {a}x^2 + {b}x + {c} = 0")
            print(f"Value of x is : {solveQuad(a,b,c)}")
        elif choice == 3 :
            print("--------compound Interest Calculator---------")
            p = input("Enter Principle (initial) Amount : ")
            r = input("Enter Interest Rate (in %) per year : ")
            n = input("Enter Number of times interest compounds in a year (12-for monthly) (2-for Half yearly): ")
            t = input("Enter Time in years : ")

            ans = compundInt (p,r,n,t)

            print(f"Your Total Compound Interest is : {ans}")
        elif choice == 4 :
            break