#include <iostream>
#include <climits>
#include <vector>
#include<queue>
using namespace std;

    vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {
        // Code here
        vector<int>dist(V,1e8);
        
        dist[src]=0;
        int e=edges.size();
        
        for(int i=0;i<V-1;i++){
            
            bool flag=0;
            for(int j=0;j<e;j++){
                
                int u=edges[j][0];
                int v=edges[j][1];
                int wt=edges[j][2];
                
                if(dist[u]==1e8) continue;
                
                
                if(dist[u]+wt <dist[v]){
                    dist[v]=dist[u]+wt;
                    flag=1;
                }
            }
            
            if(flag==0) return dist;
        }
        
        for(int j=0;j<e;j++){
                
                int u=edges[j][0];
                int v=edges[j][1];
                int wt=edges[j][2];
                
                if(dist[u]==1e8) continue;
                
                if(dist[u]+wt <dist[v]){
                    vector<int>ans;
                    ans.push_back(-1);
                    return ans;
                }
        }
        return dist;
    }


int main() {
    int V = 5;
    vector<vector<int>> edges = {
        {0, 1, 2},
        {0, 2, -4},
        {1, 2, 1},
        {1, 3, 7},
        {2, 4, -3},
        {3, 4, 1}
    };
    int src = 0;

    vector<int> result = bellmanFord(V, edges, src);

    for (int dist : result) {
        cout << dist << " ";
    }
    cout << endl;

    return 0;
}