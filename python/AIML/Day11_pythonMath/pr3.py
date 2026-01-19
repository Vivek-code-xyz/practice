import math

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
    

print("--------compound Interest Calculator---------")
p = input("Enter Principle (initial) Amount : ")
r = input("Enter Interest Rate (in %) per year : ")
n = input("Enter Number of times interest compounds in a year (12-for monthly) (2-for Half yearly): ")
t = input("Enter Time in years : ")

ans = compundInt (p,r,n,t)

print(f"Your Total Compound Interest is : {ans}")