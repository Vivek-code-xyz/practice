import numpy as np

# Step 1: Create a 4x4 matrix
matrix = np.array([
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9, 10, 11, 12],
    [13,14, 15, 16]
])

result = matrix[matrix > 5]

print(result)