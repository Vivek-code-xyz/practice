#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// DFS helper function
void dfs(int node, vector<bool>& visited, stack<int>& s, vector<vector<int>>& edges) {
    visited[node] = true;
    for (int i = 0; i < edges[node].size(); i++) {
        if (!visited[edges[node][i]]) {
            dfs(edges[node][i], visited, s, edges);
        }
    }
    s.push(node);
}

// Topological Sort function
vector<int> topoSort(int V, vector<vector<int>>& edges) {
    vector<vector<int>> adjlist(V);
    for (int i = 0; i < edges.size(); i++) {
        adjlist[edges[i][0]].push_back(edges[i][1]);
    }

    vector<int> ans;
    vector<bool> visited(V, false);
    stack<int> s;

    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i, visited, s, adjlist);
        }
    }

    while (!s.empty()) {
        ans.push_back(s.top());
        s.pop();
    }

    return ans;
}

// Main function
int main() {
    int V, E;
    cout << "Enter number of vertices and edges: ";
    cin >> V >> E;

    vector<vector<int>> edges;
    cout << "Enter directed edges (from to):" << endl;
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        edges.push_back({u, v});
    }

    vector<int> topo = topoSort(V, edges);

    cout << "Topological Sort order: ";
    for (int x : topo) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}

/* TEST CASE 
Enter number of vertices and edges: 
6 6
Enter directed edges (from to):
5 0
5 2
4 0
4 1
2 3
3 1


Topological Sort order: 4 5 2 3 1 0 */
