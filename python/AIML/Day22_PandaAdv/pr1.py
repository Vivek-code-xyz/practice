import pandas as pd

data = {
    'Student_ID': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kate', 'Leo'],
    'Math_Score': [85, 92, 78, 88, 95, 72, 89, 81, 90, 87, 65, 94],
    'Science_Score': [88, 85, 92, 79, 91, 68, 87, 83, 94, 86, 70, 89],
    'English_Score': [90, 88, 75, 85, 93, 74, 91, 80, 89, 84, 72, 87],
    'Total_Score': [263, 265, 245, 252, 279, 214, 267, 244, 273, 257, 207, 270],
    'Attendance_%': [95, 88, 92, 85, 98, 75, 90, 82, 96, 87, 70, 93],
    'Age': [20, 22, 19, 21, 20, 23, 19, 22, 20, 21, 24, 19],
    'Hours_Studied': [15, 18, 10, 14, 20, 8, 17, 12, 19, 16, 7, 18],
    'City': ['New York', 'Boston', 'Chicago', 'Boston', 'New York', 'Chicago', 'Boston', 'New York', 'Chicago', 'Boston', 'Chicago', 'New York']
}
df = pd.DataFrame(data)
# print( df[df["Hours_Studied"] > 10] )

df2 = df.sort_values(["Total_Score","Attendance_%"],ascending=False)
# print(df2.to_string())

df3 = df.groupby("City")["Total_Score"].agg(["sum","mean","count"])
# print(df3)

