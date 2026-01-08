nums = [1, 2, 3, 2, 4, 1, 5, 3, 6, 4]


ans=[]

for x in nums :
    if x not in ans :
        ans.append(x)


print(ans)