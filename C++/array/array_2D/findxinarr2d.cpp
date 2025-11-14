#include <iostream>
using namespace std;

pair<int,int> findx(int arr[][3],int n,int m, int x){
    for(int i=0;i<n;i++){
        
        for(int j=0;j<m;j++){
            if(arr[i][j]==x){
                cout<<"element is present in matrix";
               return {i,j};
            }
        }
    }
    cout<<"element not found!";
    return {-1,-1};
}

int main(){
    int arr[][3]={1,2,3,4,5,6,7,8,9};
    findx(arr,3,3,6);

    return 0;
    }
