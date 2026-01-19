import numpy as np


scores = np.random.randint(35,97,size=7)

mean = np.mean(scores)
median = np.median(scores)
st_deviation = np.std(scores)

min = np.min(scores)
max = np.max(scores)

normalisedScore = ((scores-min)/(max-min)) *100 

print(scores)

for x in normalisedScore :
    print(round(x,2),end=" ")