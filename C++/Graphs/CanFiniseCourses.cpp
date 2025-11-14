#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adjlist(numCourses);
    vector<int> indeg(numCourses, 0);

    for (int i = 0; i < prerequisites.size(); i++) {
        adjlist[prerequisites[i][1]].push_back(prerequisites[i][0]);
        indeg[prerequisites[i][0]]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indeg[i] == 0) {
            q.push(i);
        }
    }

    int count = 0;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        count++;
        for (int i = 0; i < adjlist[node].size(); i++) {
            indeg[adjlist[node][i]]--;
            if (indeg[adjlist[node][i]] == 0) {
                q.push(adjlist[node][i]);
            }
        }
    }

    return (count == numCourses);
}

int main() {
    // Example 1:
    int numCourses = 4;
    vector<vector<int>> prerequisites = {{1,0},{2,0},{3,1},{3,2}};
    cout << "Can finish? " << (canFinish(numCourses, prerequisites) ? "Yes" : "No") << "\n";

    // Example 2 (cycle present):
    numCourses = 2;
    prerequisites = {{1,0},{0,1}};
    cout << "Can finish? " << (canFinish(numCourses, prerequisites) ? "Yes" : "No") << "\n";

    return 0;
}
