
import numpy as np
import matplotlib.pyplot as plt

deg  = [x for x in range(0,721)]

deg_array = np.array(deg)
rad_array = np.deg2rad(deg)

sines = np.sin(rad_array)
cosines = np.cos(rad_array)

plt.plot(deg_array,sines,label="sine")
plt.plot(deg_array,cosines,label="cosines")

plt.title("Trignomatric Functions")
plt.xlabel("Degree")
plt.ylabel("Sin/Cos (deg)")

plt.legend()
plt.show()