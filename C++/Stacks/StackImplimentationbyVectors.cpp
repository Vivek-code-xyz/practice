#include<iostream>
#include <vector>
using namespace std;

class Stack{
    vector<int>v;
    public:
    void push(int val){
        v.push_back(val);
        return;
    }
    void pop(){
        if(v.size()==0){
            cout<<"Error:Stack is empty";
            return;
        }
        v.pop_back();
    }
    int top(){
        if(v.size()==0){
            cout<<"Error:Stack is empty";
            return -1;
        }
        return v[v.size()-1];
    }
    int size(){
        return v.size();
    }

    void display(){
        for(int i=0;i<v.size();i++){
            cout<<v[i]<<" ";
        }
        cout<<endl;
        return;
    }
};

int main(){
    Stack st;
    st.push(60);
    st.push(65);
    st.push(67);
    st.push(69);
    st.pop();
    st.display();
    cout<<st.top();
    return 0;
}