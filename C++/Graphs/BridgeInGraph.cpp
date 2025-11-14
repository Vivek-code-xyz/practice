#include<iostream>
using namespace std;
#include<vector>

    void dfs(int node,int parent,int &count,vector<int>&low,vector<int>&disc,vector<bool>&visited,vector<vector<int>>&ans,vector<vector<int>>&adj){
        visited[node]=1;
        disc[node]=low[node]=count;
        for(int i=0;i<adj[node].size();i++){
            int next=adj[node][i];
            if(next==parent) continue;
            else if(visited[next]){
                low[node]=min(low[node],low[next]);
            }
            else{
                count++;
                dfs(next,node,count,low,disc,visited,ans,adj);
                low[node]=min(low[node],low[next]);

                if(low[next]>disc[node]){
                    ans.push_back({node,next});
                }
            }
        }
    }

    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>>adj(n);
        for(int i=0;i<connections.size();i++){
            adj[connections[i][0]].push_back(connections[i][1]);
            adj[connections[i][1]].push_back(connections[i][0]);
        }
        vector<vector<int>>ans;
        vector<int>low(n);
        vector<int>disc(n);
        vector<bool>visited(n,0);
        int count=0;

        dfs(0,-1,count,low,disc,visited,ans,adj);
        return ans;
    }






    int main(){
        int n=4;
        vector<vector<int>>connections={{0,1},{1,2},{2,0},{1,3}};
        vector<vector<int>>ans=criticalConnections(n,connections);

        cout<<"critical edges in given graph are..."<<endl;
        for(int i=0;i<ans.size();i++){
            for(int j=0;j<ans[i].size();j++){
                
                cout<<ans[i][j]<<"->";
            }
            cout<<endl;
        }
    }