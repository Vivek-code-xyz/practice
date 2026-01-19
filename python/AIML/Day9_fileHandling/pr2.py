names = ["Aarav", "Vivek", "Neha", "Priya", "Ankit", "Kunal", "Sneha", "Rahul", "Pooja"]

with open("s.txt",'w') as file :
    for name in names :
        file.write(f"{name}\n")

