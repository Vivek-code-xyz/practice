#include <iostream>
using namespace std;

int sum2d(int arr[][4],int n,int m){
    int sum=0;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            sum+=arr[i][j];
        }
    }
    return sum;

}

int digsum(int n,int arr[][4]){
    int sum=0;
    for(int i=0;i<n;i++){
        sum+=arr[i][i];
       if(i!=n-1-i) sum+=arr[i][n-1-i];
     
    }
   return sum;
    
}

int main(){
    int arr[4][4]={1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0};
    cout<<"sum of all elements of matrix: "<<sum2d(arr,4,4)<<endl;
    cout<<"sum of digonal elements of matrix: "<<digsum(4,arr);
    return 0;

}