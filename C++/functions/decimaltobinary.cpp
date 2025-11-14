#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "Enter a number:";
    cin >> n;
    int bi = 0;
    while (n != 0)
    {
         
        bi += n % 2;
        bi *= 10;
        n /= 10;
    }
    cout << "binari form = " << bi;
    return 0;
}