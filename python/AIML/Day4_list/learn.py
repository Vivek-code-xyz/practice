name = ['Vivek','Rohan','Riya','ExKnown',"Vivek"] #creating a list

print(name[3]) #accessing the list

print(name[-2]) #-1 starts from back and go to front.. -2 means second last

#list functions
name.append("Param")  #append at last
print(name)

name.insert(2,"Aramco")     #insert(idx,ele)
print(name)

name.remove("Vivek")  #removes the first accurence of value
print(name)

removed_ele=name.pop()       #remove element from index and also returns it...default last
print(name)
print(removed_ele)

print(name.pop(2)) #prints the 2nd idx element and also removes it from array


#sort a list
nums=[2,6,1,7,9,2]

nums.sort() #sort in asscending
print(nums)
nums.sort(reverse=True)  #sort in descending
print(nums)