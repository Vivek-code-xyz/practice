nums = [10, 45, 2, 99, 23, 99, 67]


maxele = float('-inf')
secmaxele = float('inf')

for ele in nums:
    if ele > maxele :
        secmaxele=maxele
        maxele=ele
    elif  ele != maxele and ele > secmaxele :
        secmaxele=ele
    
print(secmaxele)