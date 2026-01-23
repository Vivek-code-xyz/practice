import pandas as pd

df = pd.read_csv("workdata.csv")
data =df.copy(deep=True)

new_df = df.dropna()    #drops all the null value rows in data and returns a new dataframe

df.dropna(inplace=True)  #now it changes original df

# print(df.to_string())


#now if i have to fill specific value at nulls i use fillna


# data.fillna(130,inplace=True)
data.fillna({"Calories":150},inplace=True)   #for spcific column only

print(data.to_string())