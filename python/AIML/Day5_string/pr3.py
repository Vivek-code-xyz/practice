#reversing words
letstr = input ("Enter a string sentence : ")

words = letstr.split()

revwrods = []

for w in words :
    revwrods.append(w[::-1])

ans = " ".join(revwrods)

print(ans)