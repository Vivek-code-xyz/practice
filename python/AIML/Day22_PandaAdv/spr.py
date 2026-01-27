import pandas as pd


data = {
    'Name': [
        'Alice', 'Alice', 'Alice', 'Alice', 'Alice', 'Alice', 'Alice', 'Alice', 'Alice',
        'Bob', 'Bob', 'Bob', 'Bob', 'Bob', 'Bob', 'Bob',
        'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie',
        'David', 'David', 'David', 'David', 'David', 'David', 'David', 'David', 'David', 'David',
        'Emma', 'Emma', 'Emma', 'Emma', 'Emma', 'Emma', 'Emma', 'Emma',
        'Frank', 'Frank', 'Frank', 'Frank',
        'Grace', 'Grace', 'Grace', 'Grace', 'Grace', 'Grace', 'Grace', 'Grace', 'Grace', 'Grace', 'Grace',
        'Henry', 'Henry', 'Henry', 'Henry', 'Henry', 'Henry',
        'Ivy', 'Ivy', 'Ivy', 'Ivy', 'Ivy', 'Ivy', 'Ivy', 'Ivy', 'Ivy', 'Ivy',
        'Jack', 'Jack', 'Jack', 'Jack', 'Jack', 'Jack', 'Jack', 'Jack',
        'Kate', 'Kate', 'Kate',
        'Leo', 'Leo', 'Leo', 'Leo', 'Leo', 'Leo', 'Leo', 'Leo', 'Leo',
        'Mia', 'Mia', 'Mia', 'Mia', 'Mia', 'Mia',
        'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah', 'Noah',
        'Olivia', 'Olivia', 'Olivia', 'Olivia', 'Olivia', 'Olivia', 'Olivia'
    ],
    
    'Subject': [
        'Math', 'Math', 'Science', 'English', 'English', 'History', 'History', 'Physics', 'Computer Science',
        'Math', 'Science', 'Science', 'Geography', 'Chemistry', 'Biology', 'Biology',
        'English', 'History', 'Physics', 'Physics', 'Art',
        'Math', 'Math', 'Science', 'Science', 'English', 'Geography', 'Geography', 'Chemistry', 'Psychology', 'Music',
        'Science', 'English', 'History', 'History', 'Geography', 'Physics', 'Computer Science', 'Economics',
        'Math', 'Biology', 'Art', 'Art',
        'Math', 'Science', 'Science', 'English', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Economics',
        'English', 'History', 'Geography', 'Chemistry', 'Art', 'Music',
        'Math', 'Math', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Computer Science', 'Economics', 'Psychology',
        'Math', 'Science', 'English', 'English', 'Geography', 'Chemistry', 'Biology', 'Music',
        'Physics', 'Computer Science', 'Economics',
        'Math', 'Science', 'English', 'History', 'Geography', 'Chemistry', 'Biology', 'Computer Science', 'Art',
        'Science', 'English', 'History', 'Geography', 'Chemistry', 'Biology',
        'Math', 'Math', 'Science', 'Science', 'English', 'History', 'History', 'Geography', 'Physics', 'Computer Science', 'Economics', 'Psychology',
        'Math', 'English', 'History', 'Geography', 'Physics', 'Computer Science', 'Art'
    ],
    
    'Score': [
        88, 92, 76, 91, 94, 85, 87, 79, 96,
        72, 81, 84, 68, 77, 89, 91,
        65, 73, 82, 85, 71,
        95, 98, 88, 91, 86, 78, 82, 93, 89, 75,
        97, 89, 92, 95, 84, 88, 91, 86,
        58, 63, 69, 71,
        84, 87, 90, 88, 91, 79, 85, 82, 86, 92, 83,
        77, 74, 81, 79, 68, 72,
        93, 96, 89, 87, 91, 94, 88, 92, 85, 90,
        81, 78, 84, 87, 76, 83, 80, 74,
        67, 71, 69,
        86, 83, 89, 91, 78, 87, 85, 94, 76,
        82, 79, 88, 75, 84, 81,
        99, 97, 94, 96, 91, 88, 92, 87, 95, 98, 93, 89,
        73, 78, 82, 76, 80, 75, 69
    ],
    
    'Semester': [
        1, 2, 1, 1, 2, 1, 2, 2, 1,
        1, 1, 2, 2, 1, 1, 2,
        2, 1, 1, 2, 1,
        1, 2, 1, 2, 2, 1, 2, 1, 2, 1,
        1, 2, 1, 2, 1, 2, 1, 2,
        1, 2, 1, 2,
        2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2,
        1, 2, 1, 2, 1, 2,
        1, 2, 2, 1, 2, 1, 1, 2, 1, 2,
        2, 1, 1, 2, 1, 2, 2, 1,
        2, 1, 1,
        1, 2, 1, 2, 2, 1, 2, 1, 2,
        1, 1, 2, 2, 1, 2,
        1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1,
        1, 2, 1, 2, 1, 2, 1
    ]
}

df = pd.DataFrame(data)


# print ( df.groupby("Name")["Score"].sum().sort_values(ascending=False).head(3))

# print ( df.groupby("Subject")["Score"].mean())

# print( df.groupby("Name")["Score"].agg(lambda x: (x>85).all()))

# print (df[df['Score'] > 85])

