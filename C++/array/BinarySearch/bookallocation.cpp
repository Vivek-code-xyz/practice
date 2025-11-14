#include <iostream>
#include <vector>
using namespace std;

bool isvalid(vector<int>vec,int m,int mid){
    int stu=1,pages=0;
    for(int i=0;i<vec.size();i++){ 
     if(vec[i]>mid) return false;

     if(pages + vec[i]<= mid){
        pages+=vec[i];

     } else{
        stu++;
        pages=vec[i];
     }

    }
    if(stu>m) return false;
    else return true;
}

int bookall(vector<int>vec,int m){
    int n= vec.size();
    if(m>n) return -1;
    int st=0,end=0;
    int ans=-1;
    for(int i=0;i<n;i++) end+=vec[i];
    while(st<=end){
        int mid=st + (end - st)/2;
        if(isvalid(vec,m,mid)){
            ans=mid;
            end=mid-1;
        }
        else st=mid+1;

    }
    return ans;
}

int main(){
    vector<int>arr={2,1,3,4};
    int m=2;
    cout<<bookall(arr,m);
    return 0;

}