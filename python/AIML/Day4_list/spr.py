todolist =[]


while True :
    print("Menu :")
    print("To Add Task Click 1")
    print("To View All Task Click 2")
    print("To Mark Done A specific Task Click 3")
    print("To Exit Click 4")

    inputedVal = int(input())
    if inputedVal>4 or inputedVal<1 : print("Invalid Input")
    else :
        if inputedVal==1:
            newtask = input("Enter a new Task")
            todolist.append(newtask)
        elif inputedVal==2:
            for i,val in enumerate(todolist):
                print(f"{i+1} : {val}")
        elif inputedVal==3:
            removetask = int(input("Enter Task number That marks to be Done : "))
            todolist.pop(removetask)
        else :
            break