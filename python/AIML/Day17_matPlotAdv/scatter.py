import matplotlib.pyplot as plt
import numpy as np

x = np.random.rand(50)
y = np.random.rand(50)

plt.scatter(x,y,marker='s',color="green",alpha=0.5)

plt.xlabel("X axis")
plt.ylabel("Y axis")
plt.title("Scatter Graph")

plt.show()