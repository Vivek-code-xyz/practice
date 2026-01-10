#check if prime or not
def isPrime(num):
    if num <2 : return False
    elif num == 2 : return True
    elif num%2==0 : return False
    else :
        for i in range(3,int(num**0.5)+1,2) :
            if num%i == 0 : return False
        return True
    


number = int(input("Enter a Number : "))

if isPrime(number) : print (f"{number} is Prime number")
else : print(f"{number} is not a prime number")
        