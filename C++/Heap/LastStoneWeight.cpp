#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// LeetCode 1046 - Last Stone Weight
int lastStoneWeight(vector<int>& stones) {
    priority_queue<int> q;

    for (int i = 0; i < stones.size(); i++) {
        q.push(stones[i]);
    }

    while (q.size() > 1) {
        int a = q.top();
        q.pop();
        int b = q.top();
        q.pop();

        if (a != b) {
            q.push(a - b);
        }
    }

    if (q.empty()) return 0;
    return q.top();
}

// Main function to test lastStoneWeight
int main() {
    vector<int> stones = {2, 7, 4, 1, 8, 1};

    int result = lastStoneWeight(stones);
    cout << "The last remaining stone's weight is: " << result << endl;

    return 0;
}
