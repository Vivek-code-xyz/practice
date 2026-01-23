import pandas as pd

df = pd.read_csv('data.csv')


print(df.head(10))   # prints first 10 rows of data 
print(df.tail(10))   # prints last 10 rows of data
print(df.head())  # default prints 5 rows


print(df.info())   # prints info about the data and each columns