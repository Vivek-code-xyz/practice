#include <iostream>

using namespace std;

int main()
{
    int a, b;
    cout << "enter two numbers ";
    cin >> a >> b;
    if (a > b)
        cout << a << " is larger number";
    else
        cout << b << " is larger number";
    return 0;
}