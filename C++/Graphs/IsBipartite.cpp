#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// BY BFS TRAVERSAL
bool isBipartite(vector<vector<int>>& graph) {
    vector<int> color(graph.size(), -1);
    queue<int> q;

    for (int i = 0; i < graph.size(); i++) {
        if (color[i] == -1) {
            q.push(i);
            color[i] = 0;

            while (!q.empty()) {
                int node = q.front();
                q.pop();

                for (int j = 0; j < graph[node].size(); j++) {
                    int neighbor = graph[node][j];

                    if (color[neighbor] == -1) {
                        color[neighbor] = !color[node];
                        q.push(neighbor);
                    } else if (color[neighbor] == color[node]) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

//BY DFS TRAVERSAL
 bool helper(int node,vector<vector<int>>& graph,vector<int>&color){
        for(int i=0;i<graph[node].size();i++){
            if(color[graph[node][i]]==-1){
                color[graph[node][i]]= (!color[node]);
              if(helper(graph[node][i],graph,color)==0) return 0;
            }
            else{
                if(color[node]==color[graph[node][i]]){
                    return 0;
                }
            }
        }
        return 1;
    }
    bool isbipartite(vector<vector<int>>& graph) {
        vector<int>color(graph.size(),-1);

        for(int i=0;i<graph.size();i++){
            if(color[i]==-1){
                color[i]=0;
               if(helper(i,graph,color) == 0) return 0;
            }
        }
        return 1;
        
    }

int main() {
    // Test Case 1: Bipartite graph
    vector<vector<int>> graph1 = {
        {1, 3},    // Node 0
        {0, 2},    // Node 1
        {1, 3},    // Node 2
        {0, 2}     // Node 3
    };

    // Test Case 2: Not a bipartite graph (odd-length cycle)
    vector<vector<int>> graph2 = {
        {1, 2},    // Node 0
        {0, 2},    // Node 1
        {0, 1}     // Node 2
    };

    cout << "Graph 1 is bipartite? " << (isBipartite(graph1) ? "Yes" : "No") << endl;
    cout << "Graph 2 is bipartite? " << (isbipartite(graph2) ? "Yes" : "No") << endl;

    return 0;
}
