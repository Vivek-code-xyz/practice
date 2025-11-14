#include<iostream>
#include<vector>
using namespace std;

int main(){
    vector<int>arr={2,3,4,4,-7,-1,4,-2,6};
    int n=arr.size();
    int k=3;
    vector<int>ans(n-k+1,0);

    int p=-1;
    for(int i=0;i<k;i++){
        if(arr[i]<0){
            p=i;
            break;
        }
    }
   if(p!=-1) ans[0]=arr[p];

    int i=1,j=k;
    while(j<n){
        if(p>=i) ans[i]=arr[p];
        else{
            p=-1;
            for(int x=i;x<j;x++){
                if(arr[x]<0) {
                    p=x;
                    break;
                }
            }
            if(p!=-1) ans[i]=arr[p];
          
        }
        i++;j++;
    }

    for(int val:ans){
        cout<<val<<" ";
    }

    return 0;
}