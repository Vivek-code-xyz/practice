import numpy as np
import matplotlib.pyplot as plt

x = [x for x in range(-20,21)]
xarr = np.array(x)

def plotGraph (x,y,type,eq):



    plt.plot(x,y,label = eq )

    plt.title(f"{type} Curve Graph ")
    plt.xlabel("X axis")
    plt.ylabel("Y axis")

    plt.axhline(y=0, linestyle='--')
    plt.axvline(x=0, linestyle='--')

    plt.legend()
    plt.show()

def linearPlot(a,b) :
    # y = ax + b
    y = a*xarr + b
    plotGraph(xarr,y,"Linear",f"Y = {a}X + {b}")

def QuadPlot(a,b,c) :
    
    y = a*(xarr**2) + b*xarr + c
    plotGraph(xarr,y,"Quadratic",f"Y = {a}X^2 + {b}X +{c}")


def CubePlot(a,b,c,d) :
    y = a*(xarr**3) + b*(xarr**2) + c*(xarr) + d
    plotGraph(xarr,y,"Cubic",f"Y = {a}X^3 + {b}X^2 + {c}X + {d}")



print("Menu")
print("1 : Linear")
print("2 : Quadratic")
print("3 : Cubic")

choice = int(input("Enter Your choice : "))

if choice == 1 : 
    print("Equation : Y = AX + B")
    a = float(input("Enter A : "))
    b = float(input("Enter B :"))
    linearPlot(a,b)

elif choice == 2 :
    print("Equation : Y = AX^2 + BX + C")
    a = float(input("Enter A : "))
    b = float(input("Enter B :"))
    c = float(input("Enter C : "))
    QuadPlot(a,b,c)
elif choice == 3 :
    print("Equation : Y = AX^3 + BX^2 + CX + D")
    a = float(input("Enter A : "))
    b = float(input("Enter B :"))
    c = float(input("Enter C : "))
    d = float(input("Enter D :"))
    CubePlot(a,b,c,d)
else :
    print("Invalid Choice made")
