#include <iostream>
using namespace std;

int fibb(int n)
{
    int sum = 0;
    int a = 0, b = 1;

    if (n == 1)
    {
        cout << n - 1;
        return n - 1;
    }
    else
    {
        cout << "0 ";
        for (int i = 2; i <= n; i++)
        {
            sum = a + b;
            a = b;
            b = sum;
            cout << sum << " ";
        }
    }
    return sum;
}
int main()
{
    int x;
    cout << "Enter a number:";
    cin >> x;
   
    cout<<fibb(x);
    return 0;
}