#include <iostream>
#include <algorithm>

// brute force
using namespace std;
int main()
{
    int maxw = 0;
    int n;
    cout << "enter no of walls:";
    cin >> n;
    int arr[n];
    int idx[2];
    cout << "enter height of each wall:";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
        int ht = 0;
        int wdth = 0;
        int crrw = 0;
    for (int i = 0; i < n - 1; i++)
    {
        
        for (int j = i + 1; j < n; j++)
        {
            ht = min(arr[i], arr[j]);
            wdth = j - i;
            crrw = ht * wdth;
            if (crrw > maxw)
            {
                maxw = crrw;
                idx[0] = i;
                idx[1] = j;
            }
        }
    }
    cout << "maximum water can be stored = " << maxw << endl;
    cout << "index are " << idx[0] << " " << idx[1];
    return 0;
}
