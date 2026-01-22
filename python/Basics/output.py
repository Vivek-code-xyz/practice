import pandas as pd

# Creating the initial DataFrame
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(data)

# Printing the original DataFrame
print("Original DataFrame:")
print(df)
print("\n")  # Adding a blank line for better readability

# Adding column 'C'
df['C'] = [7, 8, 9]
print("After Adding Column 'C':")
print(df)
print("\n")

# Multiplying column 'A' by 10
df['A'] = df['A'] * 10
print("After Multiplying Column 'A' by 10:")
print(df)
print("\n")

# Dropping column 'B'
df.drop('B', axis=1, inplace=True)
print("After Dropping Column 'B':")
print(df)




