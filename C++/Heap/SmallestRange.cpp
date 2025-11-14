#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<int> smallestRange(vector<vector<int>>& nums) {
    priority_queue<pair<int, pair<int,int>>, vector<pair<int, pair<int,int>>>, greater<pair<int, pair<int,int>>>> q;
    int maxi = INT_MIN;
    for (int i = 0; i < nums.size(); i++) {
        q.push(make_pair(nums[i][0], make_pair(i, 0)));
        maxi = max(maxi, nums[i][0]);
    }

    int mini = q.top().first;
    vector<int> ans = {mini, maxi};

    while (q.size() == nums.size()) {
        auto temp = q.top();
        q.pop();
        int ele = temp.first;
        int row = temp.second.first;
        int col = temp.second.second;

        if (col + 1 < nums[row].size()) {
            col++;
            q.push(make_pair(nums[row][col], make_pair(row, col)));
            maxi = max(maxi, nums[row][col]);
            mini = q.top().first;

            if (maxi - mini < ans[1] - ans[0]) {
                ans[0] = mini;
                ans[1] = maxi;
            }
        }
    }

    return ans;
}

int main() {
    vector<vector<int>> nums = {
        {4, 10, 15, 24, 26},
        {0, 9, 12, 20},
        {5, 18, 22, 30}
    };

    vector<int> result = smallestRange(nums);

    cout << "Smallest Range: [" << result[0] << ", " << result[1] << "]" << endl;

    return 0;
}
