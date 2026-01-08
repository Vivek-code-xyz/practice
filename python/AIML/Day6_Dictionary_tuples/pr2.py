text = input("Enter Sentence : ")

words = text.split()


word_freq = {}

for word in words :
    if(word not in word_freq.keys()) : word_freq[word]=1
    else : word_freq[word]+=1

print("Frequencies : ")
for x in word_freq :
    print(f"{x} --> {word_freq[x]}")
