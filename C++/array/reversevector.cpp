#include <iostream>
#include <vector>
using namespace std;

void rev(vector<int> &v, int n)
{
    for (int i = 0, j = n - 1; j > i; i++, j--)
    {
        swap(v[i], v[j]);
    }
    return;
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
    rev(vec, n);
    cout << "reversed array : ";
    for (int i : vec)
        cout << i << " ";
    return 0;
}