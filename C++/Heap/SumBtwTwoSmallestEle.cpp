#include <iostream>
#include <queue>
using namespace std;

// Your helper function
long long helper(long long arr[], long long n, long long k) {
    priority_queue<long long> q;
    long long sum = 0;

    for (int i = 0; i < k; i++) {
        q.push(arr[i]);
    }

    for (int i = k; i < n; i++) {
        if (arr[i] < q.top()) {
            q.pop();
            q.push(arr[i]);
        }
    }

    while (!q.empty()) {
        sum += q.top();
        q.pop();
    }

    return sum;
}

// Main function to compute sum between two Kth smallest
long long sumBetweenTwoKth(long long A[], long long N, long long K1, long long K2) {
    long long a = helper(A, N, K1);
    long long b = helper(A, N, K2 - 1);
    return b - a;
}

// Main function to run the program
int main() {
    long long A[] = {1, 3, 12, 5, 15, 11};
    long long N = sizeof(A) / sizeof(A[0]);
    long long K1 = 3;
    long long K2 = 6;

    long long result = sumBetweenTwoKth(A, N, K1, K2);
    cout << "Sum between " << K1 << "th and " << K2 << "th smallest elements is: " << result << endl;

    return 0;
}
