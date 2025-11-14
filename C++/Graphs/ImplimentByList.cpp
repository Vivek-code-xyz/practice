#include<iostream>
using namespace std;
#include<vector>

//ADJECENCY LIST
//WIGHTED GRAPH WITH NO DIRECTION

int main(){
   int vertex,edge;
   
    cout<<"Enter no of vertex and edge of graph : ";
    cin>>vertex>>edge;

   vector < vector< pair<int,int> > >adjlist(vertex);
    cout<<"Now describe the edge between vertex in form of x to y and weightage as (x y w) : ";
    int u,v,weight;
    for(int i=0;i<edge;i++){
        cin>>u>>v>>weight;
        adjlist[u].push_back(make_pair(v,weight));
        adjlist[v].push_back({u,weight});
    }

    for(int i = 0; i < vertex; i++){
        for(auto edge : adjlist[i]){
            // To avoid printing both (u,v) and (v,u), print only when i < edge.first
            if(i < edge.first) {
                cout << i << " --- " << edge.first << " (" << edge.second << ")\n";
            }
        }
    }

    return 0;

    
}