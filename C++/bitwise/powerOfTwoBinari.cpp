#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "enter a number in binary:";
    cin >> n;
    int sum = 0;
    while (n > 0)
    {
        sum += n % 10;
        n /= 10;
    }
    if (sum == 1)
        cout << "given number is power of 2";
    else
        cout << "given number is not power of two";
    return 0;
}