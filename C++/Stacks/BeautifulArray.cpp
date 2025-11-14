#include<iostream>
#include<stack>
#include<vector>
using namespace std;

int main(){
    vector<int>arr={2,3,5,-4,6,-2,-8,9};
    int n=arr.size();
    stack<int>st;
    st.push(arr[0]);
    for(int i=1;i<n;i++){
        if(arr[i]<0 && st.size()>0) st.pop();
        else{
            st.push(arr[i]);
        }
    }
    vector<int>ans(st.size());
    for(int i=st.size()-1;i>=0;i--){
        ans[i]=st.top();
        st.pop();
    }

    cout<<"buatiful array is: ";

    for(int i=0;i<ans.size();i++){
        cout<<ans[i]<<" ";
    }
    cout<<endl;
    return 0;

}