#include<iostream>
using namespace std;
#include<stack>
#include<vector>

int main(){
    vector<int>arr={4,3,9,3,6,8,3,8};
    int n=arr.size();
    vector<int>ans(n);
    stack<int>st;

    st.push(arr[0]);
    ans[0]=-1;
    for(int i=1;i<n;i++){
        while(!st.empty()&& arr[i]>=st.top()){
            st.pop();
        }
        ans[i]= (st.empty())? -1 : st.top() ;
        st.push (arr[i]);
    }

    for(int i=0;i<n;i++){
        cout<<ans[i]<<" ";
    }
}

