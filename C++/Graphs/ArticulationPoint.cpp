#include<iostream>
using namespace std;
#include<vector>

  void dfs(int node,int parent,int &count,vector<int>&low,vector<int>&disc,vector<bool>&visited,vector<bool>&arti,vector<int>adj[]){
        visited[node]=1;
        disc[node]=low[node]=count;
        int child=0;
        for(int i=0;i<adj[node].size();i++){
            int next=adj[node][i];
            if(next==parent) continue;
            else if(visited[next]){
                low[node]=min(low[node],disc[next]);
            }
            else{
                count++;
                child++;
                dfs(next,node,count,low,disc,visited,arti,adj);
                low[node]=min(low[node],low[next]);

                if(low[next]>=disc[node]&&parent!=-1){
                    arti[node]=1;
                }
            }
        }
        if(child>1&&parent==-1){
            arti[node]=1;
        }
    }
    vector<int> articulationPoints(int V, vector<int> adj[]) {
        // Code here
        vector<bool>arti(V,0);
        vector<bool>visited(V,0);
        vector<int>low(V);
        vector<int>disc(V);
        
        int count=0;
        dfs(0,-1,count,low,disc,visited,arti,adj);
        
        vector<int>ans;
        for(int i=0;i<V;i++){
            if(arti[i]==1){
                ans.push_back(i);
            }
        }
        
        if(ans.size()==0){
            ans.push_back(-1);
        }
        return ans;
    }




// --- Paste your dfs() and articulationPoints() functions here ---

int main() {
    int V = 5;  // Number of vertices

    // Create adjacency list
    vector<int> adj[5];

    // Hardcoded edges
    vector<pair<int,int>> edges = {
        {0,1}, {0,3},
        {1,2}, {1,3},
        {3,4}
    };

    // Build the adjacency list
    for(auto &e : edges){
        adj[e.first].push_back(e.second);
        adj[e.second].push_back(e.first);
    }

    // Call articulationPoints function
    vector<int> result = articulationPoints(V, adj);

    cout << "Articulation Points: ";
    for(int x : result) cout << x << " ";
    cout << endl;

    return 0;
}
