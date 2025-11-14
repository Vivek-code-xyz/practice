#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main(){
    cout << "no ofelements in array :";
    int n;
    cin >> n;
   vector< int> arr(n);
  
    cout << "enter elements (0/1/2 only) : ";
    for (int i = 0; i < n; i++)
        cin >> arr[i];

//brute force O(nlogn)
    sort(arr.begin(),arr.end());

//optimised O(n)
int count0=0,count1=0,count2=0;
for(int i:arr){
    if(i==0) count0++;
    else if(i==1) count1++;
    else count2++;
}

int ele=0;
while(ele<count0){
    arr[ele]=0;
    ele ++;
}
while(ele<(count1+count0)){
    arr[ele]=1;
    ele++;
}
while(ele<n){
    arr[ele]=2;
    ele++;
}



//output
    for(int i=0;i<n;i++){

        cout<<arr[i]<<" ";
    }
    return 0;
    
}