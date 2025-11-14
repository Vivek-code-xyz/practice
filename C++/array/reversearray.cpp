#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "enter size of array:";
    cin >> n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)  cin >> arr[i];
    
    for(int i=0,j=n-1;i<j;i++,j--){
        int temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }

    cout<<"reversed arrey: ";
    for (int i = 0; i < n; i++)  cout<< arr[i] <<" ";
    
    return 0;
}