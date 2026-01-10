#fibbonaci

def fibb(n) :
    seq = [0]*n
    
    for i,_ in enumerate(seq) :
        if i<=1 : seq[i]=i
        else : seq[i]=seq[i-1]+seq[i-2]
    
    return seq


num =  int (input("Enter a number : "))

ans = fibb(num)

print(f"Fibbonacci series upto {num}th term is : ")
for a in ans :
    print(a,end=" ")


