listof = [1,4,3,5,3,2,5,4]

meanofdata = sum(listof)/len(listof)

listof.sort()

n = len(listof)
med = None

if n%2==0 :
    med =( listof[(n//2) - 1] + listof[(n//2)])/2
else :
    med = listof[n//2]

mode = None

dir = {}

for i in listof :
    if i not in dir.keys():
        dir[i] = 1
    else :
        dir[i] += 1

mode = max(dir,key=dir.get)

print(f"{meanofdata} {mode} {med}")