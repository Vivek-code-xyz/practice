#include <iostream>
#include <climits>
#include <vector>
#include<queue>
using namespace std;

    void dfs(int node,vector<vector<int>>&adj,vector<bool>&visited){
        visited[node]=1;
        for(int i=0;i<adj[node].size();i++){
            if(visited[adj[node][i]]==0){
                dfs(adj[node][i],adj,visited);
            }
        }
    }
    int isEulerCircuit(int V, vector<vector<int>>&adj) {
        // Code here
        int odd=0;
        vector<int>degree(V,0);
        for(int i=0;i<V;i++){
            degree[i]=adj[i].size();
            if(degree[i]%2==1){
                odd++;
            }
        }
        
        if(odd!=0&&odd!=2) return 0;
        
        vector<bool>visited(V,0);
        
        for(int i=0;i<V;i++){
            if(degree[i]){
                dfs(i,adj,visited);
                break;
            }
        }
        
        
        for(int i=0;i<V;i++){
            if(degree[i]&&visited[i]==0){
                return 0;
            }
        }
        
        
        if(odd==0)return 2;
        return 1;
        
        
        
        
    }


int main() {
    int V = 7, E = 6;
   vector< vector<int>> adj(V);

    // Test case: two disconnected components
    vector<pair<int,int>> edges = {
        {0,1}, {1,2}, {2,0},
        {3,4}, {4,5}, {5,3}
    };

    for (auto &edge : edges) {
        int u = edge.first, v = edge.second;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    int result = isEulerCircuit(V, adj);

    cout << result << endl; // Expected output: 0

    return 0;
}
