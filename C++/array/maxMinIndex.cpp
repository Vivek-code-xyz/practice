#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "enter size of array:";
    cin >> n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int nmax = INT16_MIN;
    int nmin = INT16_MAX;
    int minid=0,maxid=0;
    for (int i = 0; i < n; i++)
    {
        nmin = min(arr[i], nmin);
        nmax = max(arr[i], nmax);
        if(nmin==arr[i]) minid=i;
        if(nmax==arr[i]) maxid=i;
    }
    cout << "minimum element of arrey= " << nmin <<" index = "<<minid<< endl;
    cout << "maximum element of arrey= " << nmax <<" index = "<<maxid<< endl;
    

    return 0;
}