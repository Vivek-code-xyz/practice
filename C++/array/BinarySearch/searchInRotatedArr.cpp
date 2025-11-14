#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>vec,int target){
    int n=vec.size();
    int st=0,end=n-1;
    while(st<=end){
        int mid=st +(end-st)/2;
        if(vec[mid]==target ) return mid;
        if(vec[mid]>=vec[st]){
            if(target<=vec[mid]&&target>=vec[st])
            end=mid-1;
            else st=mid+1;
        }
        else{
            if(target>=vec[mid] && target<=vec[end])
            st=mid+1;
            else end=mid-1;
        }
    }
    return -1;


}
int main(){
    vector<int>arr={5,6,7,9,45,1,3,4};
    int  target=9;
    cout<< search(arr,target);
    return 0;
}