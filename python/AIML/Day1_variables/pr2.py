a=19
b=23
c="vivek"

print(f"a : {a} and b : {b}")
a,b = b,a
print(f"a : {a} and b : {b}")


#  b and c are swapped no matter what type they are
print(f"b : {b} and c : {c}")
print(f"type of b : {type(b)} , type of c  : {type(c)}")
b,c=c,b
print(f"b : {b} and c : {c}")
print(f"type of b : {type(b)} , type of c  : {type(c)}")
