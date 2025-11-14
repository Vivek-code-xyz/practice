#include<iostream>
#include<stack>
#include<vector>
using namespace std;

void printstack(stack<int>&s){
    stack<int>temp;
    while(!s.empty()){
        temp.push(s.top());
        s.pop();
    }
    while(temp.size()!=0){
        cout<<temp.top()<<" ";
        s.push(temp.top());
        temp.pop();
    }
    cout<<endl;
    return ;
}

void pushAtIdx(stack<int>&st,int idx,int val){
    stack<int>temp;
    while(st.size()>idx){
        temp.push(st.top());
        st.pop();
    }
    st.push(val);
    while(!temp.empty()){
        st.push(temp.top());
        temp.pop();
    }
    return;
}

int main(){
    stack<int>st;
    st.push(10);
    st.push(20);
    st.push(30);
    st.push(40);
    st.push(50);
    printstack(st);
    pushAtIdx(st,3,70);
    printstack(st);
   return 0;
}