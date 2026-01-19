import numpy as np

one_d = [3, 7, 1, 9, 4, 8]


array =np.array(one_d)
print(array)
print(f"max idx : {np.argmax(array)}")
print(f"min idx : {np.argmin(array)}")