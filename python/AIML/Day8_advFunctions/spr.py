import statistics

def calculate_statistics (*num,opration="mean") :
    if not num : 
        print("no number provided")
        return
    
    numbers = list(num)

    if opration == "mean" :
        return statistics.mean(numbers)
    elif opration == "mode" :
        return statistics.mode(numbers)
    elif opration == "median" :
        return statistics.median(numbers)
    elif opration == "range":
        return max(numbers) - min(numbers)
    
    return "Invalid operation"


# Examples
print(calculate_statistics(10, 20, 30))                           # 20.0 (mean)
print(calculate_statistics(10, 20, 30, 40, 50, opration='median'))  # 30
print(calculate_statistics(1, 2, 2, 3, 3, 3, opration='mode'))      # 3
print(calculate_statistics(5, 15, 25, 35, opration='range'))        # 30