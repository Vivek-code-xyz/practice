// brute force bet
#include <iostream>

using namespace std;

int main()
{
    int n, tar;
    cout << "enter size of sorted array:";
    cin >> n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    cout << "enter target sum ";
    cin >> tar;
    int sum=0;
    for(int i=0;i<n-1;i++){
        for(int j=i+1;j,n;j++){
           sum = arr[i]+arr[j];
           if(sum>tar) break;
            if(sum == tar){
                cout<<"targetsum found \n";
                cout<<"numbers "<<arr[i]<<" + "<<arr[j];
            }

        }
    }
    return 0;
}