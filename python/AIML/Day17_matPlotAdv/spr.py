import matplotlib.pyplot as plt

subjects = ["Math", "Science", "English", "History", "Computer"]
avg_scores = [78, 72, 80, 68, 85]

attendance = [60, 65, 70, 75, 80, 85, 90, 95]
scores =     [55, 60, 65, 70, 75, 82, 88, 92]

tests = [1, 2, 3, 4, 5]
test_scores = [62, 68, 74, 79, 85]

grades = ["A", "B", "C", "D", "F"]
grade_count = [12, 18, 10, 5, 2]

# Create figure
plt.figure(figsize=(12, 8))

# ------------------ Plot 1 ------------------
plt.subplot(2, 2, 1)
plt.bar(subjects, avg_scores)
plt.title("Average Scores by Subject")
plt.xlabel("Subject")
plt.ylabel("Average Score")
plt.xticks(rotation=30)

# ------------------ Plot 2 ------------------
plt.subplot(2, 2, 2)
plt.scatter(attendance, scores)
plt.title("Attendance vs Scores")
plt.xlabel("Attendance (%)")
plt.ylabel("Score")

# ------------------ Plot 3 ------------------
plt.subplot(2, 2, 3)
plt.plot(tests, test_scores, marker="o")
plt.title("Score Trend Over 5 Tests")
plt.xlabel("Test Number")
plt.ylabel("Score")

# ------------------ Plot 4 ------------------
plt.subplot(2, 2, 4)
plt.bar(grades, grade_count)
plt.title("Grade Distribution")
plt.xlabel("Grade")
plt.ylabel("Number of Students")

# Adjust layout
plt.tight_layout()
plt.show()
