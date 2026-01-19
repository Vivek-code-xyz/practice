try:
    f=None
    f = open("s.txt",'r')
    content = f.read()
except FileNotFoundError :
    print("file is not present in this folder")
else :
    print("file content is : ",content)
    f.close()
