import numpy as np
import math

arr = np.array([3,6,5,6,4,2,6,2,7,3,2,9,1])

meandata = np.mean(arr)


varience = np.sum((arr-meandata)**2)/len(arr)
print(varience)

std = math.sqrt(varience)
print(std)