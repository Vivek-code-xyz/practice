import numpy as np

daily_sales = [
    [120, 150, 130, 170, 200, 220, 180],  # Week 1
    [100, 140, 160, 180, 210, 230, 190],  # Week 2
    [110, 145, 155, 165, 195, 215, 175],  # Week 3
    [130, 160, 170, 190, 225, 250, 210]   # Week 4
]

arr = np.array(daily_sales)

weeklysales = np.sum(arr,1)
print(weeklysales)
print(np.argmax(weeklysales)+1)

print(np.argmax(np.sum(arr,0)))

avg_sale = np.mean(arr)
print(arr[arr > avg_sale])

