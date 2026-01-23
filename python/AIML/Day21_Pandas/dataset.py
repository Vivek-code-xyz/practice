import pandas as pd

dataset = {
    "cars" : ["BMW","Audi","Tata"],
    "ratings":[2.3,4.5,6.9]
}

myvar = pd.DataFrame(dataset)
# print(myvar)

#pandas series

a = [1,2,3,4,5,6,4,"vivek",2,1]
sra = pd.Series(a)

print(sra[7])

#creating labels
data = [3,4,5]
cordinates = pd.Series(data,index=['x','y','z'])
print(cordinates['x'])


#single column means series and multicolumns means dataframs


student ={
    "names": ["vivek",'kirtan',"prince","jigar","dev","het","param"],
    "floor":[10,10,10,6,8,8,8]
}

op = pd.DataFrame(student,index=[f"{chr(97+i)}" for i in range(0,7)])
print(op)