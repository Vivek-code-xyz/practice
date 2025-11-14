#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isposs(vector<int> vec, int m, int n, int minlardis)
{
    int cows = 1, lastdis = vec[0];
    for (int i = 1; i < n; i++)
    {
        if ((vec[i] - lastdis) >= minlardis)
        {
            cows++;
            lastdis = vec[i];
        }
    }
    if (cows < m)
        return false;
    else
        return true;
}

int cowpos(vector<int> arr, int m)
{
    int n = arr.size();
    int ans = -1;
    sort(arr.begin(), arr.end());
    int st = 1, end = arr[n - 1] - arr[0];
    while (st <= end)
    {
        int mid = st + (end - st) / 2;

        if (isposs(arr, m, n, mid))
        {
            ans = mid;
            st = mid + 1;
        }
        else
            end = mid - 1;
    }
    return ans;
}

int main()
{
    vector<int> vec = {4,8,15,16,23,42,50};

    int c = 4;
    cout << cowpos(vec, c);
    return 0;
}