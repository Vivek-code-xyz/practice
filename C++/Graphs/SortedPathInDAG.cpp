#include <iostream>
#include <vector>
#include <stack>
#include <climits>
using namespace std;

void dfs(int node, vector<vector<pair<int,int>>>& adj,
         vector<bool>& visited, stack<int>& s) {
    visited[node] = 1;
    for (int i = 0; i < adj[node].size(); i++) {
        if (visited[adj[node][i].first] == 0) {
            dfs(adj[node][i].first, adj, visited, s);
        }
    }
    s.push(node);
}

vector<int> shortestPath(int V, int E, vector<vector<int>>& edges) {
    // code here
    vector<vector<pair<int,int>>> adj(V);
    
    for (int i = 0; i < E; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        int wt = edges[i][2];
        adj[u].push_back({v, wt});
    }
    
    stack<int> s;
    vector<bool> visited(V, 0);
    dfs(0, adj, visited, s);
    
    vector<int> dist(V, INT_MAX);
    dist[0] = 0;
    
    while (s.size()) {
        int node = s.top();
        s.pop();
        
        for (int j = 0; j < adj[node].size(); j++) {
            int naig = adj[node][j].first;
            int wet = adj[node][j].second;
            if (dist[node] != INT_MAX) // avoid overflow
                dist[naig] = min(dist[naig], wet + dist[node]);
        }
    }
    
    for (int i = 0; i < V; i++) {
        if (dist[i] == INT_MAX) {
            dist[i] = -1;
        }
    }
    
    return dist;
}

int main() {
    // Hard-coded test case
    int V = 6;
    int E = 7;
    vector<vector<int>> edges = {
        {0, 1, 2},
        {0, 4, 1},
        {4, 5, 4},
        {4, 2, 2},
        {1, 2, 3},
        {2, 3, 6},
        {5, 3, 1}
    };
    
    vector<int> result = shortestPath(V, E, edges);
    
    cout << "Shortest distances from node 0:" << endl;
    for (int i = 0; i < result.size(); i++) {
        cout << "Node " << i << ": " << result[i] << endl;
    }
    
    return 0;
}
