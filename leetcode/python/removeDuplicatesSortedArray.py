# remove duplicates from sorted array

nums = [1, 3, 3, 5, 7, 8, 8, 19, 35, 57, 57, 67, 85]

def removeDuplicates(nums) -> int:
  nums[:] = sorted(set(nums))
  return len(nums)

print(removeDuplicates(nums))
