#include<iostream>
#include<stack>
#include<vector>
using namespace std;

void displayrev(stack<int>&st){
    if(st.size()==0 ) return;
    int x=st.top();
    cout<<x<<" ";
    st.pop();
    displayrev(st);
    st.push(x);
}

void display(stack<int>&st){
    if(st.size()==0 ) return;
    int x=st.top();
   
    st.pop();
    display(st);
     cout<<x<<" ";
    st.push(x);
}
void pushAtBottom(stack<int>&s,int val){
    if(s.size()==0){
        s.push(val);
        return ;
    }
    int x=s.top();
    s.pop();
    pushAtBottom(s,val);
    s.push(x);

}
void reverseStack(stack<int>&st){
    if(st.size()==1) return;
    int x=st.top();
    st.pop();
    reverseStack(st);
    pushAtBottom(st,x);
}
int main(){
    stack<int>st;
    st.push(10);
    st.push(20);
    st.push(30);
    st.push(40);
    st.push(50);
    display(st);
    // pushAtBottom(st,90);
    reverseStack(st);
    cout<<endl;
    display(st);
}