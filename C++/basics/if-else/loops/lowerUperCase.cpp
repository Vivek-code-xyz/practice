#include <iostream>
using namespace std;

int main()
{
    char n;
    cout << "enter a latter:";
    cin >> n;
    if (n >= 'a' && n <= 'z')
        cout << "lower case letter";
    else if (n >= 'A' && n >= 'Z')
        cout << "upper case letter";
    else if (n >= '0' && n <= '9')
        cout << "digit";
    else
        cout << "special charecter";
    return 0;
}