import pandas as pd




pd.options.display.max_rows = 169
df = pd.read_csv("data.csv")

print(df.to_string())

