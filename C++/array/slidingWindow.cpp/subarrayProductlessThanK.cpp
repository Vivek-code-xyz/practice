#include<iostream>
#include<vector>
using namespace std;

int numSubarrayProductLessThanK(vector<int>& nums, int k) {
    if(k<=1) return 0;
    int n=nums.size();
    int i=0,j=0,count=0,product=1;
    while(j<n){
        product*=nums[j];
      while(product>=k){
        count+=j-i;
        product/=nums[i];
        i++;
      }
      j++;
    }

    while(i<n){
          count+=j-i;
        product/=nums[i];
        i++;
    }

    return count;
}

int main() {
   
    vector<int> nums = {10, 5, 2, 6};  // test input
    int k = 100;
    int result = numSubarrayProductLessThanK(nums, k);
    cout << result << endl;  // Expected output: 8
    return 0;
}


