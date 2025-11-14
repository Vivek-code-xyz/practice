#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

vector<int> findDisappearedNumbers(vector<int>& nums) {
    int n=nums.size();
    int i=0;
    while(i<n){
        int correctidx=nums[i]-1;
        if(nums[correctidx]==nums[i]) i++;
        else swap(nums[i],nums[correctidx]);
    }

    vector<int>ans;
    for(int i=0;i<n;i++){
        if(nums[i]!=i+1) ans.push_back(i+1);
    }

    return ans;
}
int main() {
    vector<int> nums = {4, 3, 2, 7, 8, 2, 3, 1};   // test case

    vector<int> missingNumbers = findDisappearedNumbers(nums);

    cout << "Missing numbers are: ";
    for (int num : missingNumbers) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
