import matplotlib.pyplot as plt

# Input sizes (X-axis)
input_size = [1000, 2000, 3000, 4000, 5000]

# Steps for each algorithm
selection = [492185, 1958437, 4389203, 7890504, 12110853]
bubble    = [1432634, 5720912, 12980730, 23210396, 35860903]
insertion = [238957, 985314, 218565, 3895265, 5890710]
merge     = [19840, 44126, 71653, 97345, 124965]
quick     = [20314, 45984, 73226, 102451, 129612]

# Plot lines
plt.plot(input_size, selection, label='Selection Sort', marker='o')
plt.plot(input_size, bubble, label='Bubble Sort', marker='o')
plt.plot(input_size, insertion, label='Insertion Sort', marker='o')
plt.plot(input_size, merge, label='Merge Sort', marker='o')
plt.plot(input_size, quick, label='Quick Sort', marker='o')

# Labels and title
plt.xlabel('Input Size')
plt.ylabel('Number of Steps')
plt.title('Sorting Algorithms Performance Comparison')

# Legend
plt.legend()

# Show graph
plt.show()
