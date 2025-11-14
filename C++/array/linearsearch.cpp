#include <iostream>
using namespace std;
int linear(int arr[], int n, int target)
{
    for (int i = 0; i < n; i++)
    {
        if (target == arr[i])
        {
            cout << "index of target = " << i;
            return i;
        }
    }

    return -1;
}
int main()
{
    int n;
    cout << "enter size of array:";
    cin >> n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int target;
    cout << "enter target:";
    cin >> target;
    linear(arr,n,target);
    return 0;
}