#include <iostream>
#include<algorithm>
using namespace std;

int main(){
    int arr[]={1,2,3,4,5,6,7,8};
    int n=sizeof(arr)/sizeof(int);
    fill(arr,arr+5,10); // first pointer is inclusive while 
                        // second pointer is exclusive means only arr+4 values are overwrite
    for(int i:arr) cout<<i<< " "; //range based loop

    cout<<endl;
    
    fill(arr,arr+n,20);

    for(int i:arr) cout<<i<< " "; 
    return 0;


}