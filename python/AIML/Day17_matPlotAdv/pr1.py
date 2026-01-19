import matplotlib.pyplot as plt

categories = [
    "Rent",
    "Food",
    "Transportation",
    "Electricity",
    "Internet",
    "Entertainment",
    "Healthcare",
    "Miscellaneous"
]

expenses = [
    12000,   # Rent
    4500,    # Food
    2000,    # Transportation
    1800,    # Electricity
    900,     # Internet
    1500,    # Entertainment
    1200,    # Healthcare
    1100     # Miscellaneous
]



plt.barh(categories,expenses)
plt.xlabel("categories")
plt.ylabel("expenses")
plt.title('Monthly report')

plt.show()