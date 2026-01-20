A =[[1,2],[3,4]]
B = [[5,6],[7,8],[9,0]]

import numpy as np

arr1 = np.array(A)
arr2 = np.array(B)

try:
    sumation = arr1 + arr2
    multiply =np.matmul(arr1,arr2)
except:
    raise TypeError("Matrices are not capable for Addition/subtraction")
    raise ValueError("Operator broad castion is not compatible")
else:
    print(f"Sum of Matrices is : {sumation}")
    print(f"matrix Multiplication is  : {multiply}")
