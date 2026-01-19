def quartiles(data):
    data.sort()
    n = len(data)

    # Q2 (Median)
    if n % 2 == 0:
        q2 = (data[n//2 - 1] + data[n//2]) / 2
        lower = data[:n//2]
        upper = data[n//2:]
    else:
        q2 = data[n//2]
        lower = data[:n//2]
        upper = data[n//2 + 1:]

    # Q1
    m = len(lower)
    if m % 2 == 0:
        q1 = (lower[m//2 - 1] + lower[m//2]) / 2
        q3 = (upper[m//2 - 1] + upper[m//2]) / 2
    else:
        q1 = lower[m//2]
        q3 = upper[m//2]

    return q1, q2, q3




a,b,c = quartiles([1,2,3,4,5,6,7])

print(f"{a} {b} {c}")