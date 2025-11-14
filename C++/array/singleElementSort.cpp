#include <iostream>
#include <vector>

using namespace std;
int searchele(vector<int>arr){
    int st=0,end=arr.size()-1;
    if(arr.size()==1) return arr[0];
    while(st<=end){
        int mid=st + (end - st)/2;
        if(mid==0 && arr[mid]!=arr[mid+1]) return arr[mid];
        if(mid==arr.size()-1 && arr[mid]!=arr[mid-1]) return arr[mid];
        if(arr[mid]!=arr[mid+1] && arr[mid]!=arr[mid-1]) return arr[mid];

        if(mid%2==0){
            if(arr[mid]==arr[mid-1]) end=mid-1;
            else st=mid+1;
        }
        else{
            if(arr[mid]==arr[mid-1]) st=mid+1;
            else end=mid-1;
        }
    }
    return -1;
}

int main(){
    vector<int>vec={1,1,2,2,3,3,4,5,5,6,6};
    vector<int>vec2={1};
    cout<<searchele(vec2);
    return 0;
}