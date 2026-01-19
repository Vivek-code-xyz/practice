def division (a,b) :
    try :
        c = int(a)
        d = int(b)
        ef = c/d   
    except ZeroDivisionError:
        print("Error! : Diviser should not be zero")
    except ValueError :
        print("Error! : input should be valid number")
    except TypeError :
        print("Error! : Type Error occures")
    else :
        print(f"division : {ef}")



a = input("Enter a Numerator : ")
b = input("Enter a Denominator : ")

division(a,b)