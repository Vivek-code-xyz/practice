#include<iostream>
using namespace std;
#include<vector>

//adjacency matrix
// unweighted undirected graph
int main(){
    int vertex,edge;
    cout<<"Enter no of vertex and edge of graph : ";
    cin>>vertex>>edge;

    cout<<"Now describe the edge between vertex in form of x to y : ";

    int u,v;
    vector<vector<bool>>mat(vertex , vector<bool>(vertex,false));
    for(int i=0;i<edge;i++){
        
            cin>>u>>v;
            mat[u][v]=true;
            mat[v][u]=true;

    }

    //output

    for(int i=0;i<vertex;i++){
        for(int j=0;j<vertex;j++){
            cout<<mat[i][j]<<" ";
        }
        cout<<endl;
    }
    return 0;
}