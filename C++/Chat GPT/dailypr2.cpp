// first ele more than one
#include <iostream>
#include <vector>
#include<algorithm>
using namespace std;

int check(vector<int>arr,int n){
    sort(arr.begin(),arr.end());
    int ans=-1;
    for(int i=0;i<n;i++){
        if(arr[i]==arr[i+1]) {
            ans=arr[i];
            break;
        }
    }

    return ans;

}


int main(){
    vector<int>vec={1,3,2,6,5,8,8};
    int n=vec.size();
    int ans=check(vec,n);
    if(ans==-1) cout<<"non element is repeating";

    for(int i=0;i<n;i++){
        if(ans==vec[i]){
            cout<<"the index of first occuring smallest \nrepeating element is : "<<i;
            break;
        }
    }
 return 0;

}


