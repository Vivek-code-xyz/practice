#include <iostream>
using namespace std;
void rev(int arr[], int st, int end)
{
    while (st < end)
    {
        swap(arr[st], arr[end]);
        st++;
        end--;
    }
}
int main()
{
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    int n = sizeof(arr) / sizeof(int);
    int k;
    cout << "enter k : ";
    cin >> k;
    if (k > n)
        k %= n;
    rev(arr, 0, n - k-1);
    rev(arr, n - k , n - 1);
    rev(arr, 0, n - 1);

    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";

    return 0;
}