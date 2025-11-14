// brute force

#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n;
    cout << "enter a size of arr  : ";
    cin >> n;
    int arr[n];
    cout << "enter elements: ";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    vector<int> vec(n, 1);
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (j == i)
                continue;
            vec[i] *= arr[j];
        }
    }
    for (int i : vec)
        cout << i << " ";
        return 0;
}