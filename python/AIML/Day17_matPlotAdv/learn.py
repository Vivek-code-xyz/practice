import matplotlib.pyplot as plt

# bar graph

x = [x for x in range(10,101,10)]
y = [a*2+12 for a in x]

plt.barh(x,y,label="bar graph")

plt.xlabel("X axis")
plt.ylabel("Y axis")
plt.title("Bar Graph")
plt.legend()
plt.show()