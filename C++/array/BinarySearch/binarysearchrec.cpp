#include <iostream>
#include <vector>
using namespace std;

int BS(vector<int>arr,int tar,int st,int end){
    if(st<=end){
       int mid=st+ (end-st)/2;
       if(tar<arr[mid]) return BS(arr,tar,st,mid-1);
       else if(tar>arr[mid]) return BS(arr,tar,mid+1,end);
        else return mid;
    }
    return -1;
}

int main(){

    vector<int>vec={1,3,4,5,66,77};
    int target=66;
  cout<<  BS(vec,target,0,vec.size()-1);
    return 0;

}