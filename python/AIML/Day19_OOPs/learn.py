class student :
    name : None
    age:None

st1 = student()
st2 = student()


st1.name = "Vivek"
st1.age = 46
st2.name = "karan"
st2.age = 200
print(st1.name)

#pass
class teacher :
    pass

tr1 = teacher()
tr1.name="You are dumb"
tr1.occupation = "I am maths teacher"

print(tr1.occupation)

#delete a object

del tr1
# print(tr1)  error

print(st2.age)

