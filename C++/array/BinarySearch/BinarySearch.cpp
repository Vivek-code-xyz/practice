#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n;
    cout << "enter size of array : ";
    cin >> n;
    vector<int>arr(n);
    cout << "enter elements of array : ";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int st = 0, end = n - 1, target;
    cout<<"enter target value : ";
    cin>>target;
    bool flag=false;
    while (st <= end)
    {
        int mid = st + (end - st) / 2;
        if (arr[mid] < target)
            st = mid + 1;
        else if (arr[mid] > target)
            end = mid - 1;
        else{  
         
            cout << "target found at index : " << mid;
            flag=true;
            break;
         
       
         }
    }
    if(flag==false) cout<<"target not found";

    return 0;
}