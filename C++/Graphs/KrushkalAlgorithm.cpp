
#include<iostream>
#include<vector>
#include<queue>
using namespace std;

 int ultimateparent(int u,vector<int>&parent){
    if(u==parent[u]) return u;

    parent[u] = ultimateparent(parent[u],parent);
     return parent[u];      //path compression

 }

 void UnionByrank(int u,int v,vector<int>&parent,vector<int>&rank){
    int pu=ultimateparent(u,parent);
    int pv=ultimateparent(v,parent);
    if(rank[pu]>rank[pv]){
        parent[pv]=pu;
    }
    else if(rank[pu]<rank[pv]){
        parent[pu]=pv;
    }
    else{
        parent[pu]=pv;
        rank[pv]++;
    }
 }

    int spanningTree(int V, vector<vector<int>> adj[]) {
        
        vector<int>rank(V,0);
        vector<int>parent(V);
        for(int i=0;i<V;i++) parent[i]=i;

        // vector<pair<int ,pair<int,int>>>temp;  i can also insert this vactor into priority_queue
        // for(int i=0;i<V;i++){                      it improves my time comp... from ElogE ---> E
        //     for(int j=0;j<adj[i].size();j++){
        //         temp.push_back({adj[i][j][1],{i,adj[i][j][0]}});
        //     }
        // }


        priority_queue< pair<int ,pair<int,int>>,vector< pair<int ,pair<int,int>>>,greater< pair<int ,pair<int,int>>> >q;

        //pushing all edges into priorityqueue
        for(int i=0;i<V;i++){
            for(int j=0;j<adj[i].size();j++){
                q.push({adj[i][j][1],{i,adj[i][j][0]}});
            }
        }

        int cost=0;
        int edges=0;
        
        while(q.size()){
           int u=q.top().second.first;
           int v=q.top().second.second;
           int wt=q.top().first;
           q.pop();
           
           if(ultimateparent(u,parent)!=ultimateparent(v,parent)){
                cost+=wt;
                UnionByrank(u,v,parent,rank);
                edges++;
           }

           if(edges==V-1) break;
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