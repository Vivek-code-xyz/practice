//leetcode 1944
#include<iostream>
#include<vector>
#include<stack>
using namespace std;

vector<int> canSeePersonsCount(vector<int>& arr) {
        int n=arr.size();
        vector<int>ans(n);
        stack<int>st;
        st.push(arr[n-1]);
        ans[n-1]=0;
        for(int i=n-2;i>=0;i--){
            int count=0;
            while(st.size()>0&&arr[i]>st.top()){
                st.pop();
                count++;
            }
            if(st.size()>0) count++;
            ans[i]=count;
            st.push(arr[i]);
        }

        return ans;
}

int main(){
    vector<int>heights={10,6,8,5,11,9};
    vector<int>ans=canSeePersonsCount(heights);

    for(int i:ans){
        cout<<i<<" ";
    }
}