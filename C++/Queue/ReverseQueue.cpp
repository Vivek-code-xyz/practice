#include<iostream>
#include<queue>
#include<stack>
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

void removeateven(queue<int>&q){
    int n=q.size();
    for(int i=0;i<n;i++){
        if(i%2==1){
            q.push(q.front());
        }
        q.pop();
    }
}

void reversequeue(queue<int>&q){  //using stack
    stack<int>st;
    while(!q.empty()){
        st.push(q.front());
        q.pop();
    }

    while(!st.empty()){
        q.push(st.top());
        st.pop();
    }
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
    reversequeue(q);
    displayqueue(q);
    removeateven(q);
    displayqueue(q);
    return 0;
}