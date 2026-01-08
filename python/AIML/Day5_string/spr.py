letstr = input ("Enter a string sentence : ")
print(f"Your sentense Is: {letstr.title()}")
words = letstr.split()

print(f"You Have Written {len(words)} Words")

letstr2 = "".join(words)

print(f"You Have Mentioned {len(letstr2)} charecters without counting spaces")

