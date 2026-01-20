import numpy as np

# 2D vectors
v2_a = np.array([3, 4])
v2_b = np.array([1, 2])

# 3D vectors
v3_a = np.array([2, -1, 5])
v3_b = np.array([4, 0, -3])

def add (v1,v2):
    return v1+v2

def subtract (v1,v2):
    return v1-v2

def magnitude (v1):
    return np.linalg.norm(v1)

def dot_product(v1,v2):
    return np.sum(v1*v2)

def angle_between_vectors(v1,v2):
    cosdegree = dot_product(v1,v2)/(magnitude(v1)*magnitude(v2))
    ang_rad = np.arccos(cosdegree)
    ang_deg = np.rad2deg(ang_rad)
    return ang_deg


print("2D VECTOR CALCULATIONS")
print("----------------------")
print(f"Vector A: {v2_a}")
print(f"Vector B: {v2_b}")

print(f"Addition       : {add(v2_a, v2_b)}")
print(f"Subtraction    : {subtract(v2_a, v2_b)}")
print(f"Magnitude of A : {magnitude(v2_a):.2f}")
print(f"Magnitude of B : {magnitude(v2_b):.2f}")
print(f"Dot Product    : {dot_product(v2_a, v2_b)}")
print(f"Angle (deg)    : {angle_between_vectors(v2_a, v2_b):.2f}°")
