def listprops (givelist) :
    minval = min(givelist)
    maxval = max(givelist)
    avgval = sum(givelist)/len(givelist)

    return minval,maxval,avgval

letlist = [1,2,3,4,5,6,7,8,9]

a,b,c = listprops(letlist)
print(a,b,c,sep=" ")