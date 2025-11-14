#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
    vector<vector<int>> adjlist(n);
    vector<int> indeg(n, 0);
    
    for (int i = 0; i < relations.size(); i++) {
        adjlist[relations[i][0] - 1].push_back(relations[i][1] - 1);
        indeg[relations[i][1] - 1]++;
    }

    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indeg[i] == 0) {
            q.push(i);
        }
    }

    vector<int> prev(n, 0);
    while (!q.empty()) {
        int node = q.front();
        q.pop();

        for (int i = 0; i < adjlist[node].size(); i++) {
            int nxt = adjlist[node][i];
            indeg[nxt]--;
            if (indeg[nxt] == 0) {
                q.push(nxt);
            }
            prev[nxt] = max(prev[nxt], prev[node] + time[node]);
        }
    }

    int ans = 0;
    for (int i = 0; i < n; i++) {
        ans = max(ans, prev[i] + time[i]);
    }
    return ans;
}




int main() {
    // Example:
    // n = 3
    // relations = [[1,3],[2,3]]
    // time = [3,2,5]
    int n = 3;
    vector<vector<int>> relations = {{1, 3}, {2, 3}};
    vector<int> time = {3, 2, 5};

    int result = minimumTime(n, relations, time);

    cout << "Minimum time to finish all courses: " << result << endl;
    return 0;
}
