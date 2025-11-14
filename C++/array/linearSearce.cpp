#include <iostream>
#include <vector>
using namespace std;

int search(vector<int> v, int n, int tar)
{
    for (int i = 0; i < n; i++)
    {
        if (v[i] == tar)
        {
            cout << "element found \n index = " << i;
            return i;
        }
        else
        {
            cout << "target not found ";
            return -1;
        }
    }
}

int main()
{
    int n;
    cout << "enter no of elements:";
    cin >> n;
    vector<int> vec(n);
    cout << "enter elements of array" << endl;
    for (int i = 0; i < n; i++)
    {
        cin >> vec[i];
    }
    int target;
    cout << "enter target:";
    cin >> target;
    search(vec,n,target);
    return 0;
}