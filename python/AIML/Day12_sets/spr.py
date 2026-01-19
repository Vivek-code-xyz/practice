# People who like Pizza
pizza= {
    "Amit", "Riya", "Vivek", "Neha", "Karan", "Pooja"
}

# People who like Burgers
burger = {
    "Riya", "Vivek", "Arjun", "Karan", "Rahul"
}

# People who like Pasta
pasta = {
    "Neha", "Vivek", "Arjun", "Simran", "Pooja"
}


allthree = pizza&burger&pasta
onlypizza = pizza - (burger|pasta)
piandbugnotpa = (pizza&burger) - pasta
atleastonefood = pizza | burger | pasta

print(f"{allthree}\n {onlypizza}\n{piandbugnotpa}\n{atleastonefood}")