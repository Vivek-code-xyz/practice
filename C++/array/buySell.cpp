#include <iostream>
#include <algorithm>
using namespace std;
int main()
{
    int arr[] = {7, 1, 3, 5, 9, 4};

    int bestbuy = arr[0];
    int maxpro = 0;
    for (int i = 1; i < 6; i++)
    {
        if (bestbuy < arr[i])
        {
            maxpro = max(maxpro, arr[i] - bestbuy);
        }
        else if (arr[i] < bestbuy)
            bestbuy = arr[i];
    }

    cout << "maximum profit : " << maxpro;
}