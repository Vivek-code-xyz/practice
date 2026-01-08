#First test scores

test1_scores = {
    "Alice": 85,
    "Bob": 78,
    "Charlie": 92
}

# Second test scores

test2_scores = {
    "David": 88,
    "Emma": 95,
    "Frank": 72
}

merged_test = test1_scores.copy()

merged_test.update(test2_scores)

print(merged_test)