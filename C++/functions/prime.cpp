#include <iostream>
using namespace std;

void prime(int n)
{
    bool flag = true;

    for (int i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
        {
            flag = false;
            break;
        }
    }
    if (flag == false)
        cout << "not prime";
    else
        cout << "prime no.";
    return;
}
int main()
{
    int x;
    cout << "Enter a number:";
    cin >> x;
    prime(x);
    return 0;
}