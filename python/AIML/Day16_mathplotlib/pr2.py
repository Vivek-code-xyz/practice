import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
temperatures = [28, 30, 32, 33, 31, 29, 27]

plt.plot(days,temperatures,label="Cliemate")

plt.title("Weather in week")
plt.xlabel("Days")
plt.ylabel("Temperateure")

plt.legend()
plt.show()