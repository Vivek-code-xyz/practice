#include<iostream>
#include<stack>
#include<string>
#include<algorithm>
using namespace std;

string removeduplicate(string &s){
    stack<char>st;
    st.push(s[0]);
    for(int i=1;i<s.size();i++){
        if(st.top()==s[i])
            i++;
        else
            st.push(s[i]);
    }
    s.clear();
    while(!st.empty()){
        s+=st.top();
        st.pop();
    }
    reverse(s.begin(),s.end());
    return s;
}

int main(){
    string s="aabbcdeffgghh";
    removeduplicate(s);
    cout<<s;
}