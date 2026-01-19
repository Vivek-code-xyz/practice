# ax + b = c 

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
        


print("Please provide a,b and c for finding x (ax+b=c) : ")
a = input("Enter a : ")
b = input("Enter b : ")
c = input("Enter c : ")

print(f"Equation : {a}x + {b} = {c}")
print(f"Value of x is : {solveLinear(a,b,c)}")