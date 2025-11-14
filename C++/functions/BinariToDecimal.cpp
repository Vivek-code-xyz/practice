#include <iostream>
using namespace std;

int decimalof(int a)
{
    int sum = 0, pow = 1, dec;
    while (a > 0)
    {
        dec = a % 10;
        sum += (dec * pow);

        pow *= 2;
        a /= 10;
    }
    return sum;
}

int main()
{
    int n;
    cout << "Enter a binary number:";
    cin >> n;
    int dec = decimalof(n);
    cout << "decimal = " << dec;
    return 0;
}