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
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int n = sizeof(arr) / sizeof(int);
    for (int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }
    cout << "\n";
    rev(arr, 1, 4);

    for (int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }
    return 0;
}