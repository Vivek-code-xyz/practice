#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to detect cycle in undirected graph using BFS
bool cycle(int node, vector<bool>& visit, vector<vector<int>>& adjlist) {
    queue<pair<int, int>> q;
    q.push({node, -1});  // {currentNode, parent}
    visit[node] = true;

    while (!q.empty()) {
        int curr = q.front().first;
        int parent = q.front().second;
        q.pop();

        for (int neighbor : adjlist[curr]) {
            if (!visit[neighbor]) {
                visit[neighbor] = true;
                q.push({neighbor, curr});
            } else if (neighbor != parent) {
                // Cycle detected
                return true;
            }
        }
    }

    return false;
}

// Wrapper function
bool isCycle(int V, vector<vector<int>>& edges) {
    vector<vector<int>> adjlist(V);
    vector<bool> visit(V, false);

    // Build adjacency list
    for (int i = 0; i < edges.size(); i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        adjlist[u].push_back(v);
        adjlist[v].push_back(u);  // undirected graph
    }

    for (int i = 0; i < V; i++) {
        if (!visit[i]) {
            if (cycle(i, visit, adjlist)) {
                return true;
            }
        }
    }

    return false;
}

// Main function
int main() {
    int V, E;
    cout << "Enter number of vertices and edges: ";
    cin >> V >> E;

    vector<vector<int>> edges;
    cout << "Enter edges (u v):" << endl;
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        edges.push_back({u, v});
    }

    if (isCycle(V, edges)) {
        cout << "Graph contains a cycle." << endl;
    } else {
        cout << "Graph does not contain a cycle." << endl;
    }

    return 0;
}
