#include <iostream>
using namespace std;


int main()
{
    int n, Osum = 0, Esum = 0;
    cout << "enter a number ";
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        if (i % 2 == 0)
            Esum += i;
        else
            Osum += i;
    }

    cout << "sum of " << n << " even number is " << Esum << "\n";
    cout << "sum of " << n << " odd number is " << Osum << "\n";
    return 0;
}