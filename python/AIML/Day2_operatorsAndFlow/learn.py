age = int(input("Enter your age"))

if 18<=age<=25 :
    print("You are Now an Young Adult ")
else : print("you are kid go rest at home")

gender = str(input("Whats your gender! : "))

if gender.lower() in ["boy","man","male"] :
    print("You should work hard and secure your family")
else :
    print("Go get home and sit there with cock")

name = str(input("now say your name : "))

print(f"You say that you are {name} and your age is {age}")

is_licence  = input("do you have driving licence");

have_licence = None
if is_licence.lower() in ['yes','ya','Y'] : have_licence = True
else :  have_licence=False


if age>18 and have_licence  : print("You can Drive a car")
else : print('go and get to drive in Mobiles only kid')

