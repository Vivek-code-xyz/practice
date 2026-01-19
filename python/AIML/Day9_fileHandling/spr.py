#note taking app
from datetime import datetime
now = datetime.now()
timestamp = now.strftime("%H:%M:%S | %a %b,%Y")

notecount = 0


def addNote(note) :
    with open('notes.txt','a') as f :
        f.write(f"{notecount}. {note}   ...[{timestamp}]\n\n")

def readNote():
    with open('notes.txt','r') as f:
        print(f.read())

def removeNote():
    with open('notes.txt','w') as f:
        f.write("")



while True :
    print("Welcome To Note Taking App")
    print("Press 1 to add a new note")
    print("Press 2 to view all notes")
    print("Press 3 to Remove all notes")
    print("Press 4 to Exit")

    try:
        choice =  int(input("Enter your choice : "))
    except ValueError :
        print("Choice must be number from 1 to 4")
        continue

    if choice>4 or choice < 1 :
        print("Please choose valid option")
        continue
    elif choice == 1 :
        print("Enter your note ------------>",end=" ")
        note = input()
        notecount+=1
        addNote(note)
    elif choice == 2 :
        print("-------------------->Your Notes Content is : ")
        readNote()
        print("-----------------------------------------")
    elif choice == 3 :
        print("----------------->All notes are removed successfully...")
        removeNote()
    else :
        break