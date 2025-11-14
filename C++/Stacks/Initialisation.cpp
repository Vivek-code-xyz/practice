#include<iostream>
#include<stack>
using namespace std;

int main(){
    stack<int>st;
    st.push(10);
    st.push(20);
    st.push(30);
    st.push(40);
    st.push(50);

    cout<<st.size()<<endl; //5
    cout<<st.top()<<endl;  //50

    //printing stacks in reverse order.........
    while(!st.empty()){
        cout<<st.top()<<" ";   //printing the top element
        st.pop();     //remove the top element
    }
    cout<<endl;
    // but now our stack is empty;
    cout<<st.size(); //0

    return 0;
}