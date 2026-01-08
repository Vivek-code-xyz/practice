nums=[0,1,2,3,4,5,6,7,8,9]
#slicing is the methode to replicate the nums array over any valid ranges


print(nums[2:5])          #syntax : arr[initial:final] final idx is excluded
print(nums[:4])          #from start of arr to 4 index
print(nums[2:])   #from 2nd idx to last
print(nums[:])  #creates working copy of the nums


print(nums[::2])    # [0, 2, 4, 6, 8] - every 2nd element
print(nums[1::2])   # [1, 3, 5, 7, 9] - every 2nd, starting at 1

# Negative indices in slicing
print(nums[-3:])    # [7, 8, 9] - last 3 elements
print(nums[:-3])    # [0, 1, 2, 3, 4, 5, 6] - all but last 3
print(nums[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] - reversed