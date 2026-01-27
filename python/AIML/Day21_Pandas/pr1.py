import pandas as pd


def calc_marks(a):
    if a=="A+" :
        return 90
    elif a=="B+" : 
        return 80
    else : 
        return 70



user = {
    "name":["vivek","param","kirtan"],
    "age": [45,32,54],
    "grade":["A+","B+","C+"]
}

df = pd.DataFrame(user)

# print(df.iloc[0])

df["marks"] = df["grade"].apply(lambda x :calc_marks(x))

print(df)