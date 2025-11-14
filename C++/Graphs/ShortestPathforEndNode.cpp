#include <iostream>
#include <climits>
#include <vector>
#include<queue>
#include<algorithm>
using namespace std;

vector<int> shortestPath(int n, int m, vector<vector<int>>& edges) {
    vector<vector<pair<int,int>>> adj(n+1);
    for(int i=0;i<m;i++){
        int u=edges[i][0];
        int v=edges[i][1];
        int w=edges[i][2];
        adj[u].push_back({w,v});
        adj[v].push_back({w,u});
    }
    
    vector<bool> explore(n+1,0);
    vector<int> dist(n+1,INT_MAX);
    vector<int> parent(n+1,-1);
    
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> q;
    q.push({0,1});
    dist[1]=0;
    while(!q.empty()){
        int node=q.top().second;
        q.pop();
        if(explore[node]) continue;
        explore[node]=1;
        
        for(int i=0;i<adj[node].size();i++){
            int next=adj[node][i].second;
            int wt=adj[node][i].first;
            if(!explore[next] && dist[next]>dist[node]+wt){
                dist[next]=dist[node]+wt;
                q.push({dist[next],next});
                parent[next]=node;
            }
        }
    }
    
    vector<int> path;
    if(parent[n]==-1){
        path.push_back(-1);
        return path;
    }
    int dest=n;
    while(dest!=-1){
        path.push_back(dest);
        dest=parent[dest];
    }
    path.push_back(dist[n]);
    reverse(path.begin(),path.end());
    return path;
}

int main() {
    int n = 4; // number of nodes
    int m = 4; // number of edges
    vector<vector<int>> edges = {
        {1, 2, 2},
        {1, 3, 4},
        {2, 4, 1},
        {3, 4, 3}
    };
    
    vector<int> result = shortestPath(n, m, edges);
    
    cout << "Path (last element is total weight): ";
    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}
