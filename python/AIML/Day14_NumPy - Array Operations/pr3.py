import numpy as np

two_d = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9, 10, 11, 12]
]

arr = np.array(two_d)

print(np.sum(two_d,0))
print(np.sum(two_d,1))

