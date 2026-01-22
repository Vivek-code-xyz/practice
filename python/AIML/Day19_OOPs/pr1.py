class car:
    def __init__(self,b,m,y):
        self.brand = b
        self.model = m
        self.year = y

    def info(self):
        print(f"brand : {self.brand} \nmodel : {self.model} \nyear : {self.year}")




car1 = car("BMW","BlackParrot",2034)

car1.info()