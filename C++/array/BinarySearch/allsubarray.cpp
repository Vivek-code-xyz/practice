#include <iostream>
using namespace std;

void sub(int arr[],int n){
    for(int i=0;i<n;i++){
        for(int j=i;j<n;j++){
            for(int k=i;k<=j;k++)
            cout<< arr[k];
            cout<<" ";


        }
        cout<<endl;
    }
    return;
}

int main(){
 int a[]={1,2,3,4,5};
 sub(a,5);
 return 0;
}