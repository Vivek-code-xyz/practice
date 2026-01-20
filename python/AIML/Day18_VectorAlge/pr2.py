A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
B = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

import numpy as np

vec1 = np.array(A)
vec2= np.array(B)

print(f"Dot Product : {np.sum(vec1*vec2)}")