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
    stack<int>temp;
    while(!st.empty()){   //stores the values in reverse order in temp
        temp.push(st.top());
        cout<<st.top()<<" ";
        st.pop();
    }

    cout<<st.size()<<endl; //0
    //refill the values in st

    while(temp.size()!=0){
        st.push(temp.top());
        temp.pop();
    }

    cout<<st.size(); //5

  

    return 0;
}