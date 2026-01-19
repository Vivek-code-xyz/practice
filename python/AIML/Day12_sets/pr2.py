s1 = {1,2,3,4,5}
s2 = {2,4,5,6,8}
s3 = {2,4,5}

def subsetCheck(s1,s2) :
    if len(s1)>=len(s2):
        temp = s2
        if s2 == (s1&temp):
           print(f"{s2} is subset of {s1}") 
        else:
            print("Non of these are subset of either")

    else :
        if s1 == (s1&s2) :
            print(f"{s1} is subset of {s2}")
        else :
            print("Non of these are subset of either")
    

subsetCheck(s1,s2)
subsetCheck(s1,s3)
subsetCheck(s2,s3)

#python function for is subset
print(s3.issubset(s1))
print(s3.issubset(s2))
print(s1.issubset(s2))