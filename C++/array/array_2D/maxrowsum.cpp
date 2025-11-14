#include<iostream>
using namespace std;

int maxrow(int arr[][4],int n,int m){
    int maxsum=INT16_MIN;
    int idx=0;
    for(int i=0;i<n;i++){
        int rowsum=0;
        for(int j=0;j<m;j++){
            rowsum += arr[i][j];
        }
        if(rowsum>maxsum){
            maxsum=rowsum;
            idx=i;
        }
    }
    return idx;

}

int maxcol(int arr[][4],int n,int m){
    int maxsum=INT16_MIN;
    int idx=0;
    for(int i=0;i<n;i++){
        int colsum=0;
        for(int j=0;j<m;j++){
            colsum += arr[j][i];
        }
        if(colsum>maxsum){
            maxsum=colsum;
            idx=i;
        }
    }
    return idx;
}
int main(){
    int arr[][4]={1,2,3,4,2,3,4,5,3,4,5,6};
    cout<<"index of max row sum is : "<<maxrow(arr,3,4)<<endl;
    cout<<"index of max column sum is : "<<maxcol(arr,3,4);
    return 0;
}