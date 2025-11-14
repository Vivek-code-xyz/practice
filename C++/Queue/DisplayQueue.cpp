#include<iostream>
#include<queue>
using namespace std;

void displayqueue(queue<int>&q){    //queue passes by values in function by default
    int n=q.size();
    for(int i=0;i<n;i++){
        int x=q.front();
        q.pop();
        cout<<x<<" ";
        q.push(x);
    }
    cout<<endl;
    return;
}

int main(){
    queue<int>q;
    q.push(10);
    q.push(20);
    q.push(30);
    q.push(40);
    q.push(50);
    q.push(60);

    displayqueue(q);
    q.pop();
    displayqueue(q);
   
    return 0;
}