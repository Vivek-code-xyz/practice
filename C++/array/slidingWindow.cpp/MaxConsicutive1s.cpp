#include<iostream>
#include<vector>
using namespace std;
int longestOnes(vector<int>& nums, int k) {  // same for longest subarray of 1 after removing 1 0
    int n=nums.size();
    int i=0,j=0,flip=0;
    int maxlen=0;
    int len;
    while(j<n){
        if(nums[j]==1) j++;
        else{ //nums[j]==0
            if(flip<k) {
                flip++;
                j++;
            }
            else{ //flip==k
                len=j-i;
                maxlen=max(maxlen,len);
                while( nums[i]==1)i++;
                i++;
                j++;
            }
        }
    }
      len=j-i;
      maxlen=max(maxlen,len);

      return maxlen;

}



int main() {
   
    vector<int> nums = {1, 1, 0, 0, 1, 1, 1, 0, 1};
    int k = 2;
    int result = longestOnes(nums, k);
    cout << result << endl;
    return 0;
}
