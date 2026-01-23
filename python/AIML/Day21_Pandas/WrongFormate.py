import pandas as pd

df = pd.read_csv("workdata.csv")

# df.info()

df["Date"] = pd.to_datetime(df["Date"],format='mixed')

df.dropna(subset=['Date'],inplace=True)      #this removes null values of the Date col only
print(df.to_string())
