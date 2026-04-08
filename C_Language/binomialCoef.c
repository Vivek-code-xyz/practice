#include <stdio.h>

int min(int a, int b){
    return a<b ?a:b;
}

int binomial (int n,int k){
    int dp[n+1][k+1];

    for(int i=0;i<n+1;i++){
        for(int j=0;j<=min(i,k);j++){
            if(j==0 || j == i){
                dp[i][j]=1;
            }else{
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
            }
        }
    }

    return dp[n][k];
}

int main()
{
    int n = 5, k = 2;
    printf("%d C %d = %d",n,k,binomial(n,k));

}