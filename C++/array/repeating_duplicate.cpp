#include <iostream>
#include<vector>
#include<unordered_set>
using namespace std;

pair<int,int> hashing(vector<vector<int>>vec){
    int n = vec.size();
    int a,b;
    int sum=(n*n)*(n*n + 1)/2;
    int actsum=0;
    unordered_set<int>s;
    for(int i=0;i<n;i++){
       for(int j=0;j<n;j++){
        actsum+=vec[i][j];
        if(s.find(vec[i][j]) != s.end()){
            a=vec[i][j];
        }
        s.insert(vec[i][j]);
       }
    }
    b=sum - (actsum-a);
       
    return {a,b};
}

int main(){
    vector<vector<int> >v={{1,2,3},{4,6,7},{8,9,7}};
    pair<int,int>ans=hashing(v);
    cout<<"repeated element is : "<<ans.first;
    cout<<" missing element is : "<<ans.second;
    return 0;
}