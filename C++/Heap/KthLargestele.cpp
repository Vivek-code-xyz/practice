#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to find the Kth largest element
int findKthLargest(vector<int>& nums, int k) {
    int n = nums.size();
    priority_queue<int, vector<int>, greater<int>> q; // min-heap

    for (int i = 0; i < k; i++)
        q.push(nums[i]);

    for (int i = k; i < n; i++) {
        if (nums[i] > q.top()) {
            q.pop();
            q.push(nums[i]);
        }
    }

    return q.top();
}

// Main function to test the findKthLargest function
int main() {
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    int k = 2;

    int result = findKthLargest(nums, k);
    cout << "The " << k << "th largest element is: " << result << endl;

    return 0;
}
