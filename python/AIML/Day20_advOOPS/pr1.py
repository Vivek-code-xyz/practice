class animal :
    def __init__(self,type):
        self.type = type
    

class dog(animal):
    def __init__(self, type,breed):
        super().__init__(type)
        self.breed = breed

class cat(animal):
    def __init__(self, type,furtype):
        super().__init__(type)    
        self.furtype = furtype


d1 = dog("nonvegan","germenshepherd")
c1 = cat("vegan","cottonslature")

print(d1.breed,d1.type)
