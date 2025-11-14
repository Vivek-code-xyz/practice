#include <iostream>
using namespace std;

int main()
{
    int n;
    int revn = 0;
    cout << "Enter a number:";
    cin >> n;

    while (n > 0)
    {
        revn += n % 10;
        n /= 10;
        if (n > 0)
            revn *= 10;
    }
    cout << "reversed number is:" << revn;
    return 0;
}