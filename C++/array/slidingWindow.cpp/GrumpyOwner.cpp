#include<iostream>
#include<vector>
using namespace std;

int maxSatisfied(vector<int>& arr, vector<int>& grumpy, int k) {
    int n=arr.size();
    int maxloss=0;
    int idx=0;
    for(int i=0;i<k;i++){
        maxloss +=(arr[i]*grumpy[i]);
    }
    
    int i=1,j=k;
    int currloss=maxloss;
    while(j<n){
       currloss= currloss +(arr[j]*grumpy[j]) - (arr[i-1]*grumpy[i-1]);
       if(currloss>maxloss){
         maxloss=currloss;
         idx=i;
       }
       i++;j++;
    }

    for(int i=idx;i<idx+k;i++){
        grumpy[i]=0;
    }

    int satisfaction=0;
    for(int i=0;i<n;i++){
        if(grumpy[i]==0) satisfaction+=arr[i];
    }
    return satisfaction;
}

int main(){
    vector<int>customers={1,0,1,2,1,1,7,5};
    vector<int>grumpytime={0,1,0,1,0,1,0,1};

    int minutes=3;
    cout<<"Maximum satisfaction of owner is : "<< maxSatisfied(customers,grumpytime,minutes);

    return 0;
}