import matplotlib.pyplot as plt

study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

test_scores = [35, 40, 45, 55, 60, 65, 70, 78, 85, 92]

plt.scatter(study_hours,test_scores,marker='o',color='green',alpha=0.8)
plt.xlabel("StudyHours")
plt.ylabel("TestScores")
plt.title("Wow")

plt.show()