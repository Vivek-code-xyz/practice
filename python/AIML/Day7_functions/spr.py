import math

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero"
    return a / b

def power(a, b):
    return a ** b

def square_root(a):
    if a < 0:
        return "Error: Cannot calculate square root of negative number"
    return math.sqrt(a)

def calculator():
    while True:
        print("\n========== CALCULATOR ==========")
        print("1. Add")
        print("2. Subtract")
        print("3. Multiply")
        print("4. Divide")
        print("5. Power")
        print("6. Square Root")
        print("7. Exit")
        print("================================")
        
        choice = input("Choose operation (1-7): ")
        
        if choice == "7":
            print("Thank you for using calculator!")
            break
        
        if choice in ["1", "2", "3", "4", "5"]:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))
            
            if choice == "1":
                result = add(num1, num2)
                print(f"Result: {num1} + {num2} = {result}")
            elif choice == "2":
                result = subtract(num1, num2)
                print(f"Result: {num1} - {num2} = {result}")
            elif choice == "3":
                result = multiply(num1, num2)
                print(f"Result: {num1} × {num2} = {result}")
            elif choice == "4":
                result = divide(num1, num2)
                print(f"Result: {num1} ÷ {num2} = {result}")
            elif choice == "5":
                result = power(num1, num2)
                print(f"Result: {num1} ^ {num2} = {result}")
        
        elif choice == "6":
            num = float(input("Enter number: "))
            result = square_root(num)
            print(f"Result: √{num} = {result}")
        
        else:
            print("Invalid choice! Please select 1-7")

calculator()