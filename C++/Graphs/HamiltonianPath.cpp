#include<iostream>
using namespace std;
#include<vector>

bool dfs(int node, vector<vector<int>>& adj, vector<bool>& visited, int &count, int &n) {
    visited[node] = 1;
    count++;

    if (count == n) return 1;

    for (int i = 0; i < adj[node].size(); i++) {
        if (visited[adj[node][i]] == 0) {
            if (dfs(adj[node][i], adj, visited, count, n)) {
                return 1;
            }
        }
    }

    count--;
    visited[node] = 0;
    return 0;
}

bool check(int n, int m, vector<vector<int>> edges) {
    vector<vector<int>> adj(n);

    for (int i = 0; i < m; i++) {
        adj[edges[i][0] - 1].push_back(edges[i][1] - 1);
        adj[edges[i][1] - 1].push_back(edges[i][0] - 1);
    }

    int count = 0;
    vector<bool> visited(n, 0);

    for (int i = 0; i < n; i++) {
        if (dfs(i, adj, visited, count, n)) {
            return 1;
        }
    }
    return 0;
}

int main() {
    // Example graph with 4 vertices and 5 edges
    // Graph edges (1-based indexing):
    // 1-2, 2-3, 3-4, 4-1, 1-3
    int n = 4, m = 5;
    vector<vector<int>> edges = {
        {1, 2},
        {2, 3},
        {3, 4},
        {4, 1},
        {1, 3}
    };

    if (check(n, m, edges)) {
        cout << "Hamiltonian Path Exists" << endl;
    } else {
        cout << "No Hamiltonian Path" << endl;
    }

    return 0;
}
