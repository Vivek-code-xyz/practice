#count vowels in a string
letstr = input("Enter a Sentence : ")

ans=0
vowels="aeiouAEIOU"

for char in letstr :
    if char in vowels : ans+=1

print(f"Total No of vowels in a sentense is : {ans}")
