#include <iostream>
#include <vector>
#include<queue>
using namespace std;
//dfs
bool cycle(int node, vector<vector<int>>& adj, vector<bool>& visit, vector<bool>& path) {
    path[node] = 1;
    visit[node] = 1;

    for (int i = 0; i < adj[node].size(); i++) {
        if (path[adj[node][i]]) return true;

        if (visit[adj[node][i]]) continue;

        if (cycle(adj[node][i], adj, visit, path))
            return true;
    }

    path[node] = 0;
    return false;
}

bool isCyclic(int V, vector<vector<int>> &edges) {
    vector<vector<int>> adj(V);

    for (int i = 0; i < edges.size(); i++) {
        adj[edges[i][0]].push_back(edges[i][1]);
    }

    vector<bool> visit(V, 0);
    vector<bool> path(V, 0);

    for (int i = 0; i < V; i++) {
        if (visit[i] == 0 && cycle(i, adj, visit, path))
            return 1;
    }

    return 0;
}

//by kahns algorithm

bool iscyclic(int V, vector<vector<int>> &edges) {
        // code here
        vector<vector<int>>adj(V);
        
        for(int i=0;i<edges.size();i++){
            adj[edges[i][0]].push_back(edges[i][1]);
            
        }
        
        vector<int>indegree(V,0);
        
        for(int i=0;i<V;i++){
            for(int j=0;j<adj[i].size();j++){
                indegree[adj[i][j]]++;
            }
        }
        
        queue<int>q;
        
        for(int i=0;i<V;i++){
            if(indegree[i]==0){
                q.push(i);
            }
        }
        int count=0;
        while(q.size()){
            int node=q.front();
            q.pop();
            count++;
            for(int i=0;i<adj[node].size();i++){
               indegree [adj[node][i]]--;
               
               if(indegree [adj[node][i]]==0){
                   q.push(adj[node][i]);
               }
            }
        }
        
        return (V!=count);
        
    }


int main() {
    // Test Case 1: Contains a cycle: 0 -> 1 -> 2 -> 0
    int V = 4;
    vector<vector<int>> edges = {
        {0, 1},
        {1, 2},
        {2, 0},
        {2, 3}
    };

    if (iscyclic(V, edges))
        cout << "Cycle Detected" << endl;
    else
        cout << "No Cycle" << endl;

    return 0;
}
