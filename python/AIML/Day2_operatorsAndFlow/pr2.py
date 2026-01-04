year = int(input("Enter any Year (YYYY) : "))

if year%400 == 0 or (year%4==0 and year%100!=0) : print(f"{year} is Leap Year")
else : print(f"{year} is not a Leap Year")