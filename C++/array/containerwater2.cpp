#include <iostream>
using namespace std;

int main()
{
 
    int n;
    cout << "enter no of walls:";
    cin >> n;
    int arr[n];
    int maxw = 0;
    cout << "enter height of each wall:";
    for (int i = 0; i < n; i++)
        cin >> arr[i];

    int i = 0;
    int j = n - 1;
    while (i < j)
    {
        int ht = min(arr[i], arr[j]);
        int wt = j - i;
        int crrw = ht * wt;
        maxw = max(maxw, crrw);
        arr[i] < arr[j] ? i++ : j--;
    }
    cout << "max water can be store is : " << maxw;
    return 0;
}