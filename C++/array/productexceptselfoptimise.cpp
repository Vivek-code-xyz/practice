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
    
    int prefix[n];
    prefix[0]=1;
  int suffix[n];
  suffix[n-1]=1;

//  prefix finder

for(int i=1;i<n;i++){
    prefix[i]=prefix[i-1]*arr[i-1];
}

// suffix finder

for(int i=n-2;i>=0;i--){
    suffix[i]=suffix[i+1]*arr[i+1];
}

// calculating answer

for(int i=0;i<n;i++){
    vec[i]=prefix[i]*suffix[i];
}
    
    // display

    for(int i:vec )
    cout<< i<<"  ";
}