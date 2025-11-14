#include <iostream>
#include <queue>
using namespace std;

// Your MedianFinder class          // with stream
class MedianFinder {
public:
    priority_queue<int> left; // max-heap
    priority_queue<int, vector<int>, greater<int>> right; // min-heap

    MedianFinder() {}

    void addNum(int num) {
        if (left.empty()) {
            left.push(num);
            return;
        }

        if (num > left.top()) {
            right.push(num);
        } else {
            left.push(num);
        }

        balanceheap();
    }

    void balanceheap() {
        if (right.size() > left.size()) {
            left.push(right.top());
            right.pop();
        } else if (left.size() > right.size() + 1) {
            right.push(left.top());
            left.pop();
        }
    }

    double findMedian() {
        if (left.size() > right.size()) {
            return left.top();
        } else {
            return (left.top() + right.top()) / 2.0;
        }
    }
};

int main() {
    MedianFinder mf;

    vector<int> nums = {5, 15, 1, 3};
    for (int num : nums) {
        mf.addNum(num);
        cout << "Added: " << num << ", Current Median: " << mf.findMedian() << endl;
    }

    return 0;
}
