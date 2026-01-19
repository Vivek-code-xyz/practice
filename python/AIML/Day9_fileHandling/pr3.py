with open("sample.txt",'r') as f :
    context = f.read()

content = context.upper()

with open ("sample2.txt",'w') as file :
    file.write(content)