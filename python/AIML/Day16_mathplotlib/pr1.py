import matplotlib.pyplot as plt

x = [x for x in range(-10,11)]
y = [a**2 for a in range(-10,11)]

plt.plot(x,y,label="y=x^2")

plt.xlabel("X axis")
plt.ylabel("Y axis")
plt.title("Parabolic Curve")
plt.legend()
plt.show()