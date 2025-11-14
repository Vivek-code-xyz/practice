#include<iostream>
#include<vector>
#include<stack>
using namespace std;

vector<int> stockspan(vector<int>&v){
    int n=v.size();
    vector<int>ans(n);
    vector<int>span(n);
    stack<int>st;
    st.push(0);
    ans[0]=-1;
    for(int i=1;i<n;i++){
        while(st.size()>0 && v[i]>=v[st.top()])  st.pop();
        ans[i]= (st.empty())? -1 : st.top() ;
        st.push(i);
    }
    for(int i=0;i<n;i++){
        span[i]= i-ans[i];
    }
    return span;
}
int main(){
    vector<int>v={100,80,60,70,75,85,90};
    vector<int>an=stockspan(v);
    for(int i=0;i<an.size();i++){
        cout<<an[i]<<" ";

    }
    cout<<endl;
    return 0;
}