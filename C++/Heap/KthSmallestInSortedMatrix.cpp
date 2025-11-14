#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int kthSmallest(vector<vector<int>>& matrix, int k) {
    int n = matrix.size();
    vector<pair<int, pair<int, int>>> v;
    for (int i = 0; i < n; i++) {
        v.push_back(make_pair(matrix[i][0], make_pair(i, 0)));
    }

    priority_queue< pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>> > q(v.begin(), v.end());

    pair<int, pair<int, int>> element;
    int ans, i, j;
    while (k--) {
        element = q.top();
        q.pop();
        ans = element.first;
        i = element.second.first;
        j = element.second.second;

        if (j + 1 < n) {
            q.push(make_pair(matrix[i][j + 1], make_pair(i, j + 1)));
        }
    }

    return ans;
}

int main() {
    vector<vector<int>> matrix = {
        {1, 5, 9},
        {10, 11, 13},
        {12, 13, 15}
    };
    int k = 8;

    int result = kthSmallest(matrix, k);
    cout << "The " << k << "th smallest element is: " << result << endl;

    return 0;
}
