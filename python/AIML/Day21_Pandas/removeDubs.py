import pandas as pd

df = pd.read_csv("workdata.csv")

print(df.duplicated())        # for each row = true if it is duplicate else false

df.drop_duplicates(inplace=True) #it drops the duplicated rows

print(df.to_string())