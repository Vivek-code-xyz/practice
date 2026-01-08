#student management system
students = {

}

while True :
    print("Menu Driver : ")
    print("Add Student with his marks  : Enter 1")
    print("See All Students with thair marks : Enter 2")
    print("See Topper of the class : Enter 3")
    print("Find Class Average : Enter 4")
    print("Exit a Menu : Enter 5")

    menu = int (input("Enter your choice : "))
    if menu<= 0 or menu>=6 :
        print ("--------->     Invalid input, Enter valid menu option")
        continue
    elif menu== 1 :
        name = input("Enter student's Name : ")
        marks = int (input("Enter His/Her Marks : "))
        students[name] = marks
        print(f"--------->     {name} is added succesfully to dictionary with {marks} marks")
    elif menu ==2 :
        for nm ,mks in students.items():
            print(f"--------->     {nm} : {mks}")
    elif menu == 3 :
        topper = max (students , key = students.get )
        max_marks = students[topper]
        print(f"--------->     Topper is {topper} with {max_marks} marks")
    elif menu == 4 :
        avg = sum(students.values()) / len(students.values())
        print(f"--------->     Class Average is : {avg} ")
    else :
        break