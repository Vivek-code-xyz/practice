#include<iostream>
#include<queue>
using namespace std;

void display(queue<int>&q){
    int n=q.size();
    for(int i=0;i<n;i++){
        int x=q.front();
        q.pop();
        cout<<x<<" ";
        q.push(x);
    }
    cout<<endl;
}
int main(){
    int arr[]={3,5,7,4,8,6};
    int n=sizeof(arr)/sizeof(arr[0]);
    queue<int>q;
    int k=3;
    for(int i=0;i<k;i++){
        q.push(arr[i]);
    }

    for(int i=k;i<n;i++){
        display(q);
        q.pop();
        q.push(arr[i]);
    }

    display(q);
  
    return 0;
}