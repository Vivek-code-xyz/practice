#include <iostream>
using namespace std;

int binaryof(int n)
{
    int sum = 0;
    int pow = 1;
    int bi;
    while (n > 0)
    {
        bi = n % 2;
        sum += (bi * pow);
        n /= 2;
        pow *= 10;
    }
    cout << "binary form = " << sum;
    return sum;
}


int main()
{
    int n;
    cout << "Enter a decimal number:";
    cin >> n;
    binaryof(n);
    return 0;
}