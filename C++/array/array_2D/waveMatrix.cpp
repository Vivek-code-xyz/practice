#include<vector>
#include<iostream>
using namespace std;

int main(){
    vector<vector<int>>arr={{1,2,3},{4,5,6},{7,8,9}};
    int cols=arr[0].size();
    int rows=arr.size();
    for(int j=0;j<cols;j++){
        for(int i=0;i<rows;i++){
            if(j%2==0) cout<<arr[i][j]<<" ";
            else cout<<arr[rows-i-1][j]<<" ";
        }
    }
    return 0;
}