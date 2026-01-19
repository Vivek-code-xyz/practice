import matplotlib.pyplot as plt

x=[1,2,3,4,5]
y=[2,4,6,8,10]
y2 = [1, 2, 3, 4, 5]


plt.plot(x,y,label="y=2x")
plt.plot(x,y2,label="y=x")
plt.title("Group Binding data")
plt.xlabel("No of houses")
plt.ylabel("No of Buers")
plt.legend()
plt.show()
