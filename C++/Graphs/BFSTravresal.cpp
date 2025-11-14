#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> bfs(vector<vector<int>> &adj) {
    // Code here
    queue<int>q;
    vector<int>ans;
    q.push(0);
    int v=adj.size();
    vector<bool>visited(v,false);
    visited[0]=true;
    while(q.size()){
        int node=q.front();
        q.pop();
        ans.push_back(node);
        for(int i=0;i<adj[node].size();i++){
            if(visited[adj[node][i]]==false){
               q.push(adj[node][i]);
               visited[adj[node][i]]=true;
            }
        }
    }
    return ans;
}

int main() {
    // Graph used:
    //     0
    //    / \
    //   1   2
    //        \
    //         3

    int V = 4;
    vector<vector<int>> adj(V);

    // Edges (undirected)
    adj[0].push_back(1);
    adj[1].push_back(0);

    adj[0].push_back(2);
    adj[2].push_back(0);

    adj[2].push_back(3);
    adj[3].push_back(2);

    // Call BFS
    vector<int> result = bfs(adj);

    // Print result
    cout << "BFS Traversal: ";
    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
