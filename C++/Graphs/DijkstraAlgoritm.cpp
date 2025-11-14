#include <iostream>
#include <climits>
#include <vector>
#include<queue>
using namespace std;

    vector<int> dijkstra(int V, vector<vector<int>> &edges, int src) {
        // Code here
        vector< vector < pair<int,int> > >adjlist(V);
        for(int i=0;i<edges.size();i++){
            adjlist[edges[i][0]].push_back({edges[i][1],edges[i][2]});
            adjlist[edges[i][1]].push_back({edges[i][0],edges[i][2]});
        }
        
        
        vector<int>ans(V,INT_MAX);
        vector<bool>explore(V,0);
        ans[src]=0;
        priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>>q; 
        q.push({0,src});
        int count =V;
        while(q.size()){ 
            
            int node=q.top().second;
            q.pop();
            
            if(explore[node]==1)continue;
            
            explore[node]=1;
            
            for(int i=0;i<adjlist[node].size();i++){
                int naighbour=adjlist[node][i].first;
                int wet=adjlist[node][i].second;
                if(explore[naighbour]==0&&ans[naighbour]> ans[node]+wet){
                    
                    ans[naighbour]= ans[node]+wet;
                    q.push({ans[naighbour],naighbour});
                }
            }
        
        }
        return ans;
    
    }

int main() {
    int V = 5;
    vector<vector<int>> edges = {
        {0, 1, 2},
        {0, 2, 4},
        {1, 2, 1},
        {1, 3, 7},
        {2, 4, 3},
        {3, 4, 1}
    };
    int src = 0;

    vector<int> result = dijkstra(V, edges, src);

    for (int dist : result) {
        cout << dist << " ";
    }
    cout << endl;

    return 0;
}
