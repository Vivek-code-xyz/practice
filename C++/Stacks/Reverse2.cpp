#include<iostream>
#include<stack>
#include<vector>
using namespace std;

void printstack(stack<int>s){
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

int main(){
    stack<int>st;
    st.push(10);
    st.push(20);
    st.push(30);
    st.push(40);
    st.push(50);

   printstack(st);

   //reversing using extre vector
   vector<int>vec;

   while(!st.empty()){    //pushing elements in vector
        vec.push_back(st.top());
        st.pop();
    }

    for(int i=0;i<vec.size();i++){     //travelling for reversed push in stack
        st.push(vec[i]);
    }

    printstack(st);

    return 0;
}