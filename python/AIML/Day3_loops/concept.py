range(10)     #contains nums 0 to 9
range(2,7)  #contains nums 2 to 7 (7 is excluded)
range (4,10,2) #contains 4 to 10 nums with 2 difference means 4 6 8 only...10 excluded

#for in loop

# for i in range(10) : 
    # print(i , end=" ")       #print function ends with one extra space
    # print(i , end="") #ends with no extra space
    # print(i, end = "|") #each iteration ends with one |


count = 0
while count<15 : 
    if count==10 : break
    if count==4 :
        count+=1
        continue

    print(count,end = " ")
    count+=1


#use continue carefully in python

