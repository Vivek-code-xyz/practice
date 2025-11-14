//leetcode 1280
#include<iostream>
#include<vector>                    //prefix sum;
using namespace std;

vector<int> runningSum(vector<int>& nums) {
    int n=nums.size();
    vector<int>ans(n);
    ans[0]=nums[0];
    for(int i=1;i<n;i++){
        ans[i]+=(ans[i-1]+nums[i]);
    }
    return ans;
}

//optimissed space....

vector<int> runningsum(vector<int>& nums) {
    int n=nums.size();
    
    //inplace modificatiion..
    for(int i=1;i<n;i++){
        nums[i] =(nums[i-1]+nums[i]);
    }
    return nums;
}

int main() {
    vector<int> nums = {1, 2, 3, 4};   // Test case

    vector<int> result = runningsum(nums);

    cout << "Running sum array: ";
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
