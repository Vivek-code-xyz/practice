import pandas as pd

data = {
    "Product": ["Laptop", "Mobile", "Tablet", "Headphones", "Monitor", "Keyboard", "Mouse", "Printer"],
    "Category": ["Electronics", "Electronics", "Electronics", "Accessories", "Electronics", "Accessories", "Accessories", "Electronics"],
    "Price": [60000, 25000, 30000, 2000, 15000, 800, 500, 12000],
    "Quantity": [5, 10, 4, 20, 6, 25, 30, 3],
    "Date": ["2025-01-05", "2025-01-06", "2025-01-08", "2025-01-10",
             "2025-01-12", "2025-01-15", "2025-01-18", "2025-01-20"]
}

df = pd.DataFrame(data)

# Convert Date column to datetime
df["Date"] = pd.to_datetime(df["Date"])

# Add Total column
df["Total"] = df["Price"] * df["Quantity"]

print(df)

total_revenue = df["Total"].sum()
print("Total Revenue:", total_revenue)

top_product = df.loc[df["Total"].idxmax(), "Product"]
print("Highest Sales Product:", top_product)

avg_price = df.groupby("Category")["Price"].mean()
print(avg_price)
