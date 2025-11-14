#include<iostream>
#include<queue>
#include<vector>
using namespace std;

int timeneed(vector<int>&v,int k){
    int n=v.size();
    queue<int>q;
    for(int i=0;i<n;i++){
        q.push(i);
    }
    int time=0;
    while(v[k]!=0){
        v[q.front()]--;
        time++;
        if(v[q.front()]){
            q.push(q.front());
        }
        q.pop();
    }
    return time;
}

int Timeneeded(vector<int>&v,int k){
    int n=v.size();
    int tim=0;
    for(int i=0;i<n;i++){
        if(i>k){
            tim+=min(v[k]-1,v[i]);
        }
        else{  /// i<=k
            tim+=min(v[k],v[i]);
        }
    }
    return tim;
}


int main(){
    vector<int>ticket={2,3,2};
    int ans=timeneed(ticket,2);
   // cout<<ans<<endl;
    cout<<Timeneeded(ticket,2);
}