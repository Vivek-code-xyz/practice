#include<iostream>
#include<vector>
using namespace std;

int minSubArrayLen(int target, vector<int>& nums) {
    int n=nums.size();
    int minlen=n+1;
    int i=0,j=0;
    int sum=0;
    while(j<n){
        sum+=nums[j];
        while(sum>=target){
            minlen=min(minlen,j-i+1);
            sum-=nums[i];
            i++;
        }
        j++;
    }

    if(minlen==n+1) return 0;
    return minlen;
}

int main() {
    int target = 7;
    vector<int> nums = {2, 3, 1, 2, 4, 3};

    int result = minSubArrayLen(target, nums);
    cout << "Minimum subarray length: " << result << endl;

    return 0;
}
