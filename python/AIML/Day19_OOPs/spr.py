#library management

class book :
    def __init__(self,title, author, ISBN, available=True):
        self.title = title
        self.author =author
        self.ISBN =ISBN
        self.available = available

    def show(self):
        status = "Available" if self.available else "Borrowed" 
        print(self.title, "|", self.author, "|", self.ISBN, "|", status)
     

class library :
    def __init__(self):
        self.books = []

    def addBook(self,Book):
        self.books.append(Book)
    
    def display_books(self):
        print("\nAll Books:")
        for book in self.books:
            book.show()
    def search_by_title(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                book.show()
                return
        print("Book not found.")

    def borrow_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                if book.available:
                    book.available = False
                    print("You borrowed:", book.title)
                else:
                    print("Book already borrowed.")
                return
        print("Book not found.")



lib = library()

b1 = book("Python Basics", "Vivek", "101")
b2 = book("AI for Beginners", "Andrew", "102")

lib.addBook(b1)
lib.addBook(b2)

lib.display_books()

lib.search_by_title("Python Basics")

lib.borrow_book("Python Basics")

lib.display_books()
