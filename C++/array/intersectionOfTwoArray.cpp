#include <iostream>
using namespace std;


int main(){
      int n;
    cout << "enter size of 1st array:";
    cin >> n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
         int k;
    cout << "enter size of 2nd array:";
    cin >> k;
    int brr[k];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < k; i++)
        cin >> brr[i];
        cout<<"intersecting elements:";
        for(int i=0;i<n;i++){
            for(int j=0;j<k;j++){
                if(arr[i]==brr[j]) cout<<arr[i]<<" ";
            }
            
        }

return 0;
}