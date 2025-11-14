// PRIMS ALGORITHM
#include<iostream>
#include<vector>
#include<queue>
using namespace std;

    int spanningTree(int V, vector<vector<int>> adj[]) {
        // code here
        // vector<pair<int,int>>adj[V];
        // for(int i=0;i<edges.size();i++){
        //     adj[edges[i][0]].push_back({edges[i][1],edges[i][2]});
        //     adj[edges[i][1]].push_back({edges[i][0],edges[i][2]});
        // }
        priority_queue< pair<int ,pair<int,int>>,vector< pair<int ,pair<int,int>>>,greater< pair<int ,pair<int,int>>> >q;
        vector<bool>ismst(V,0);
        vector<int>parent(V);
        int cost=0;
        q.push({0,{0,-1}});
        
        while(q.size()){
            int wt=q.top().first;
            int node=q.top().second.first;
            int par=q.top().second.second;
            q.pop();
            if(ismst[node]==0){
                ismst[node]=1;
                cost+=wt;
                parent[node]=par;
                
                for(int i=0;i<adj[node].size();i++){
                        int nextnode = adj[node][i][0];
                        int edgeWt  = adj[node][i][1];
                    if(ismst[nextnode]==0){
                        q.push({edgeWt,{nextnode,node}});
                    }
                }
            }
        }
        
        return cost;
    }

int main() {
   const int V = 4;
    vector<vector<int>> adj[V];

    // Add edges: undirected
    adj[0].push_back({1,1});
    adj[1].push_back({0,1});

    adj[0].push_back({2,4});
    adj[2].push_back({0,4});

    adj[1].push_back({2,2});
    adj[2].push_back({1,2});

    adj[1].push_back({3,6});
    adj[3].push_back({1,6});

    adj[2].push_back({3,3});
    adj[3].push_back({2,3});

    cout << "Weight of MST: " << spanningTree(V, adj) << endl;
    return 0;
}
