#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Function to count distinct elements in every window of size k
vector<int> countDistinct(vector<int> &arr, int k) {
    int count = 0;
    unordered_map<int, int> m;
    vector<int> ans;

    for (int i = 0; i < k; i++) {
        m[arr[i]]++;
        if (m[arr[i]] == 1) count++;
    }
    ans.push_back(count);

    int n = arr.size();
    for (int i = k; i < n; i++) {
        m[arr[i]]++;
        if (m[arr[i]] == 1) count++;

        m[arr[i - k]]--;
        if (m[arr[i - k]] == 0) count--;

        ans.push_back(count);
    }

    return ans;
}

// Main function to test the above code
int main() {
    int n, k;
    cout << "Enter the size of the array: ";
    cin >> n;

    vector<int> arr(n);
    cout << "Enter the elements of the array:\n";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    cout << "Enter the window size (k): ";
    cin >> k;

    vector<int> result = countDistinct(arr, k);

    cout << "Count of distinct elements in each window of size " << k << ":\n";
    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
