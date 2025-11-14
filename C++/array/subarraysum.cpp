// brute force approch

#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "enter size of array:";
    cin>>n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int  msum = 0;
    for (int i = 0; i < n; i++)
    {
        int sum = 0;
        for (int j = i; j < n; j++)
        {

            sum += arr[j];
            msum = max(msum, sum);
        }
    }
    cout<<"maximum posible sum of subarray = "<<msum;
    return 0;
}