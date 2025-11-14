#include<iostream>
#include<vector>
#include<stack>
using namespace std;

int largestarea(vector<int>&arr){
    int n=arr.size();
    vector<int>nsi(n); //next smaller element index
    stack<int>st;
    nsi[n-1]=n;
    st.push(n-1);
    for(int i=n-2;i>=0;i--){
        while(!st.empty() && arr[i]<=arr[st.top()]) st.pop();
        nsi[i]=(st.empty())?n:st.top();
        st.push(i);
    }

    while(!st.empty()) st.pop(); //emptying the stack
   
    vector<int>psi(n);  //prev smaller element
    psi[0]=-1;
    st.push(0);
    for(int i=1;i<n;i++){
        while(!st.empty()&& arr[i]<=arr[st.top()]) st.pop();
        psi[i]=(st.empty())?-1:st.top();
        st.push(i);
    }

    //finding area
    int area=0;
    int maxarea=0;
    for(int i=0;i<n;i++){
        area= arr[i]*(nsi[i]-psi[i]-1);
        maxarea=max(maxarea,area);
    }
    return maxarea;
}

int main(){
    vector<int>heights={1,2,5,6,2,3};
    cout<<"largest area in given heighted pole is: "<<largestarea(heights);
    return 0;
}