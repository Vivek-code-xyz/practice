import pandas as pd

df = pd.DataFrame({
    "Name": ["Amit", "Neha", "Ravi", "Kiran", "Pooja"],
    "Age": [21, 22, 19, 24, 23],
    "City": ["Delhi", "Mumbai", "Pune", "Delhi", "Mumbai"],
    "Marks": [85, 90, 70, 88, 76]
})

#filter
# print(df[df["Age"]>22])

print(df[(df["Marks"] >=85) & (df["Age"] >=23)])