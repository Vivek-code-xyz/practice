#include <iostream>
#include <vector>
#include <queue>
using namespace std;
//TOPOLOGICAL SORTING.....
vector<int> topoSort(int V, vector<vector<int>>& edges) {
    vector<vector<int>> adjlist(V);
    for (int i = 0; i < edges.size(); i++) {
        adjlist[edges[i][0]].push_back(edges[i][1]);
    }

    vector<int> ans;
    vector<int> indegree(V, 0);
    queue<int> q;

    // Calculate in-degrees
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < adjlist[i].size(); j++) {
            indegree[adjlist[i][j]]++;
        }
    }

    // Enqueue nodes with in-degree 0
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }

    // Process nodes
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        ans.push_back(node);

        for (int neighbor : adjlist[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }

    return ans;
}

int main() {
    // Hardcoded Test Case:
    int V = 6;
    vector<vector<int>> edges = {
        {5, 0},
        {5, 2},
        {4, 0},
        {4, 1},
        {2, 3},
        {3, 1}
    };

    vector<int> result = topoSort(V, edges);

    // Check if topological sort was possible
    if (result.size() != V) {
        cout << "Cycle detected! Topological sort not possible." << endl;
    } else {
        cout << "Topological Sort Order: ";
        for (int node : result) {
            cout << node << " ";
        }
        cout << endl;
    }

    return 0;
}


// 
// // GRAPH STRUCTURE
//       5       4
//      / \     / \
//     v   v   v   v
//     0   2   0   1
//          |
//          v
//          3
//          |
//          v
//          1
