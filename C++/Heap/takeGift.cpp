#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
using namespace std;

// LeetCode 2558 - Take Gifts From the Richest Pile
long long pickGifts(vector<int>& gifts, int k) {
    long long ans = 0;
    priority_queue<long long> q;

    for (int i = 0; i < gifts.size(); i++) {
        q.push(gifts[i]);
    }

    while (k--) {
        long long x = q.top();
        if (x == 1) break;
        q.pop();
        long long n = sqrt(x);
        q.push(n);
    }

    while (!q.empty()) {
        ans += q.top();
        q.pop();
    }

    return ans;
}

// Main function to test pickGifts
int main() {
    vector<int> gifts = {25, 64, 9, 4, 100};
    int k = 4;

    long long result = pickGifts(gifts, k);
    cout << "Total gifts remaining after " << k << " rounds: " << result << endl;

    return 0;
}
