#include <iostream>
using namespace std;

int main()
{
    int i = 0, n;
    cout << "Enter a number:";
    cin >> n;
    while (i <= n)
    {
        i++;
        if (i == 7)
            continue;
        cout << i << " ";
    }
    return 0;
}