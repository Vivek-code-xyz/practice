#include <iostream>
#include <vector>
using namespace std;

int ways(int i,int amount,int n,vector<int>&coins,vector<vector<int>>&dp){
    if(amount==0) return 1;
    if(i>=n || amount<0) return 0;
    if(dp[i][amount]!=-1) return dp[i][amount];
    return dp[i][amount] = ways(i,amount-coins[i],n,coins,dp)+ways(i+1,amount,n,coins,dp);
}
int change(int amount, vector<int>& coins) {
    int n=coins.size();
    vector<vector<int>>dp(n+1,vector<int>(amount+1,-1));
    return ways(0,amount,n,coins,dp);
}

int main() {
    vector<int> coins = {1,2,5};
    int amount = 5;
    cout << change(amount, coins);
    return 0;
}
