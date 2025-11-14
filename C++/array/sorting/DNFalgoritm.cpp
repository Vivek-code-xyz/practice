#include <iostream>
#include <vector>
#include<algorithm>
using namespace std;
void DNF(vector<int>arr){
    int n=arr.size();
    int mid=0;
    int hi=n-1;
    int lo=0;
    while(hi>=mid){
        if(arr[mid]==0){
            swap(arr[lo],arr[mid]);
            mid++;
            lo++;
        }
        else if(arr[mid]==1){
            mid++;
        }
        else if(arr[mid]==2){
            swap(arr[mid],arr[hi]);
            hi--;
        }

       
       
    
    }
    for(int i=0;i<n;i++){

        cout<<arr[i]<<" ";
    }
    return ;
}

int main(){
    vector<int>vec={0,1,1,0,2,2,0,1,2,1};

    DNF(vec);
    return 0;
}