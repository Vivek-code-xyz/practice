#Create a list of 10 numbers and find sum and average

nums = [x for x in range(4,4+10)]

sum=0

for x in nums :
    sum+=x

print(f"Sum : {sum}")
print(f"Average : {sum/10}")