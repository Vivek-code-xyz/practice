a=int(input("enter 1st number:"))
b=int(input("enter 2nd number:"))
c=int(input("enter 3rd number:"))

if a>b : 
    if a>c :
        print(a,"is greatest number")
    else :
        print(c,"is greatest number")

elif b>a: 
    if b>c :
        print (b,"is greatest number")
    else : 
        print (c,"is greatest number")
else :
    print (c,"is the greatest number")
