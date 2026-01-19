import matplotlib.pyplot as plt

plt.subplot(2,2,1)
plt.plot([x for x in range(1,5)],[x**2 for x in range(1,5)])
plt.title("Square")

plt.subplot(2,2,2)
plt.plot([x for x in range(1,5)],[x**3 for x in range(1,5)])
plt.title("Cube")

plt.subplot(2,2,3)
plt.bar([x for x in range(1,5)],[23,12,43,32])
plt.title("Store Sales")

plt.subplot(2,2,4)
plt.scatter([x for x in range(0,12)],[1.05*(x**2) + 0.6 for x in range(0,12)],alpha=0.5,color='red',marker='x')
plt.title("scatter graph")

plt.tight_layout() #make sure plots dont overlap

plt.show()
