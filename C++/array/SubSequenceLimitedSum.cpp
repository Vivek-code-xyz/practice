#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
    int n=nums.size(); //4 5 2 1   //3 10 21
    int m=queries.size();
    vector<int>ans(m);
    sort(nums.begin(),nums.end());
    for(int i=1;i<n;i++){
        nums[i]+=nums[i-1];  //4 9 11 12
    }

    for(int i=0;i<m;i++){
        int hi=n-1,lo=0;
        int length=0;
        while(lo<=hi){
           
            int mid=lo+(hi-lo)/2;
            if(nums[mid]>queries[i]) hi=mid-1;
            else{ 
                length=mid+1;
                lo=mid+1;
            }
        }
        ans[i]=length;
    }
    return ans;
}

int main() {
    vector<int> nums = {4, 5, 2, 1};
    vector<int> queries = {3, 10, 21};
    
    vector<int> result = answerQueries(nums, queries);
    
    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}



