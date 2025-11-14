#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "enter size of array:";
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];

    int sum = 0, product = 1;
    for (int i = 0; i < n; i++)
    {
        sum += arr[i];
        product *= arr[i];
    }
    cout << "sum of elements = " << sum << endl;
    cout << "product = " << product;
    return 0;
}