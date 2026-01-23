import pandas as pd

df = pd.read_csv("workdata.csv")

# print(df.info())

for x in df.index :        
    if df.loc[x,"Duration"] > 120 :
        # df.loc[x,"Duration"] = 120        #replacing the value

        df.drop(x,inplace=True)      #  this is removing the row


print(df.to_string())