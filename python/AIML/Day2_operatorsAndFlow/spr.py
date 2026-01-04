marks  = int (input("Enter Your Marks in Python (0-100) : "))

if 0< marks <=100 : 
    if 90 < marks <=100 : print("Grade A => Exellent! keep maintaining it")
    elif 80 < marks <=90  :  print ("Grade B => Good! Go Little more")
    elif 70 < marks <=80 : print ("Grade C => Keep Score More")
    elif 60< marks <=70 :print ("Grade D => Improvement Is Needed")
    else : print("Grade F => You have Failed The Exam")
else: print("Invalid Input")