#comprehensions means you write code inside [#code] to create list like
squares = [x**2 for x in range(5)]
print(squares)

nums =[x for x in range(3,10)]
print(nums)


evens = [x for x in range(10) if x % 2 == 0]
print(evens)

# Transform strings
fruits = ["apple", "banana", "cherry"]
uppercase = [fruit.upper() for fruit in fruits]
print(uppercase)  # ['APPLE', 'BANANA', 'CHERRY']


numbers = [1, 2, 3, 4, 5, 6]
result = [x**2 for x in numbers if x % 2 == 0]
print(result)  #result have element if codition is true