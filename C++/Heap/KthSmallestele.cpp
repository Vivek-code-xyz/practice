#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to find the Kth smallest element
int kthSmallest(vector<int> &arr, int k) {
    priority_queue<int> q; // max-heap

    for (int i = 0; i < k; i++) {
        q.push(arr[i]);
    }

    for (int i = k; i < arr.size(); i++) {
        if (arr[i] < q.top()) {
            q.push(arr[i]);
            q.pop();
        }
    }

    return q.top();
}

// Main function to test kthSmallest
int main() {
    vector<int> arr = {7, 10, 4, 3, 20, 15};
    int k = 3;

    int result = kthSmallest(arr, k);
    cout << "The " << k << "rd smallest element is: " << result << endl;

    return 0;
}

