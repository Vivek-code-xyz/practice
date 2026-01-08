#phone book dictionary

phone = {
    "alice" : "1234332344",
    "bob" : "2477458635",
    "Charlie": "345-678-9012",
    "David": "456-789-0123",
    "Emma": "567-890-1234"
}

contact= input("Enter person name to search his/her contect : ")

print("contact : ",phone.get(contact,"No such a person Exist in The phone Dictionary"))