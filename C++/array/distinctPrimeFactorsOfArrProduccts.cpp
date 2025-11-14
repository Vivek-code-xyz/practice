#include<iostream>
#include<vector>
using namespace std;

void fill(vector<bool>&v){
    int n=v.size();
    for(int i=2;i<n;i++){
        for(int j=i*2;j<n;j+=i){
            v[j]=0;
        }
    }
    return ;
}
int distinctPrimeFactors(vector<int>& nums) {
    int n=nums.size();
    int mx=-1;
    for(int i=0;i<n;i++){
        mx=max(mx,nums[i]);
    }
    vector<bool>vec(mx+1,1);
    fill(vec);

vector<int>prime;

for(int i=2;i<mx+1;i++){
    if(vec[i]==1) prime.push_back(i);
}
vector<bool>result(prime.size(),0);
for(int i=0;i<n;i++){
    for(int j=0;j<prime.size();j++){
        if(prime[j]>nums[i]) break;
        if(nums[i]%prime[j]==0) result[j]=1;
    }
}
int count=0;
for(int i=0;i<result.size();i++){
    if(result[i]==0)continue;
    count++;
}
return count;
}

int main() {
    vector<vector<int>> testCases = {
        {2, 4, 6, 8, 15},
        {7, 11, 13, 17},
        {10, 15, 20, 25},
        {1, 2, 3, 5, 7},
        {100, 200, 300}
    };

    for (int i = 0; i < testCases.size(); ++i) {
        cout << "Test Case " << i + 1 << ": ";
        cout << distinctPrimeFactors(testCases[i]) << endl;
    }

    return 0;
}
