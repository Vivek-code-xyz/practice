#include <iostream>
#include<stack>
#include<string>
using namespace std;

bool isbalanced(string s){
    if(s.size()%2!=0) return false;
    stack<char>st;
    for(int i=0;i<s.size();i++){
        if(s[i]=='(') {
            st.push(s[i]);
        }
        else{
            if(st.size()==0) return false;
            else st.pop();
        }

    }
    return st.empty();
}

int main(){
    string s="((())";
   cout<< isbalanced(s);
    return 0;
}