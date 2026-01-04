#BMI Calculator

weight = float(input("Enter Your Weight (In Kg) : "))
height = float((input("Enter Your Height (In M) : ")))


BMI_idx = weight/(height**2)

print(f"Your current Body-Mass Index (BMI) is {round(BMI_idx,3)}")

if BMI_idx<18.5 : 
    print("You Are UnderWeight (Eat More Skinny dumb)")
elif BMI_idx>=18.5 and BMI_idx<25 :
    print("You Are Healthy Bro (Keep Maintainig It)")
elif BMI_idx>=25 and BMI_idx<30 : 
    print("You Are Overweight Hippo(its Best time to start dieting)")
else : 
    print("You are obese and ...\n gonna have series issues in future if not dieting properly")

