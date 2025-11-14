#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isposs(vector<int> vec,int m,int n,int mid){
    int painter=1, time=0;
    for(int i=0; i<n;i++){
        if(vec[i]> mid) return false;
        if(time+vec[i] <= mid){
            time +=vec[i];
        }
        else{
            painter ++;
            time=vec[i];
        }
    }
    if(painter > m) return false;
    else return true;
    


}

int painttime(vector<int>arr,int m){
    int n=arr.size();
    
    int ans=-1;
    int st=arr[0];int end=0;

    for(int i=0;i<n;i++){
        st=max(st,arr[i]);
        end+=arr[i];
    }

    while(st<+end){
        int mid = st +(end  - st)/2;

        if(isposs(arr,m,n,mid)){
            ans=mid;
            end=mid-1;
        }
        else{
            st=mid+1;
        }

    }
    return ans;


}
int main(){
    vector<int>vec={40,30,10,20};
    int m=2;
    cout<<painttime(vec,m);

    return -1;
}