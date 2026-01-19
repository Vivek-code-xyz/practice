a = input("Enter a number : ")

try :
    c = int(a)
except ValueError :
    print("input should be a number")
else :
    print(f"number you typed is {c} and its type is {type(c)}")