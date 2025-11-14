// most optimised leetcode 238
#include <iostream>
#include <vector>
using namespace std;

int main(){
    int n;
    cout << "enter a size of arr  : ";
    cin >> n;
    int arr[n];
    cout << "enter elements: ";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    vector<int> vec(n, 1);
    
  

//  prefix finder

for(int i=1;i<n;i++){
    vec[i]=vec[i-1]*arr[i-1];
}

// suffix finder
   int suffix=1;

for(int i=n-2;i>=0;i--){
   suffix=suffix*arr[i+1];
   vec[i]*=suffix; 
}


    
    // display

    for(int i:vec )
    cout<< i<<"  ";
}