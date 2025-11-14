#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// your function (unchanged)
vector<int> shortestPath(vector<vector<int>>& adj, int src) {
    // code here
    int n=adj.size();
    vector<int>ans(n,-1);
    vector<bool>visited(n,0);
    vector<int>parent(n,0);
    queue<int>q;
    q.push(src);
    ans[src]=0;
    visited[src]=1;
    while(q.size()){
        int node=q.front();
        q.pop();
        
        
        for(int i=0;i<adj[node].size();i++){
           if(visited[adj[node][i]]==0){
               visited[adj[node][i]]=1;

               parent[adj[node][i]]= node;   // for path : it stores parent of given node

               q.push(adj[node][i]);
               ans[adj[node][i]]=ans[node]+1;
           }
        }
    }
    return ans;
}



int main() {
    // Hardcoded graph
    int n = 7; // nodes 0..6
    vector<vector<int>> adj(n);

    // Hard edges (undirected graph)
    vector<pair<int,int>> edges = {
        {0,1}, {0,2}, {1,3}, {2,4},
        {3,5}, {4,5}, {5,6}
    };

    for (auto &e : edges) {
        adj[e.first].push_back(e.second);
        adj[e.second].push_back(e.first);
    }

    int src = 0; // starting node

    vector<int> result = shortestPath(adj, src);

    cout << "Distances from node " << src << ":\n";
    for (int i = 0; i < result.size(); i++) {
        cout << "Node " << i << ": " << result[i] << "\n";
    }

    return 0;
}
