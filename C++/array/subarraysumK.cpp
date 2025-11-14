#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// brute force...
int subarrsum(vector<int> arr, int tar)
{
    int n = arr.size();
    int count = 0;
    for (int i = 0; i < n; i++)
    {
        int sum = 0;
        for (int j = i; j < n; j++)
        {
            sum += arr[j];
            if (sum == tar)
                count++;
        }
    }
    return count;
}

// optimal solution by hashhing
int subarraySum(vector<int> &arr, int k)
{
    int n = arr.size();
    int count = 0;
    vector<int> prsum(n, 0);
    prsum[0] = arr[0];
    for (int i = 1; i < n; i++)
    {
        prsum[i] = prsum[i - 1] + arr[i];
    }
    unordered_map<int, int> m;
    for (int j = 0; j < n; j++)
    {
        if (k == prsum[j])
            count++;
        int val = prsum[j] - k;
        if (m.find(val) != m.end())
        {
            count += m[val];
        }

        if (m.find(prsum[j]) == m.end())
        {
            m.insert({prsum[j], 1});
        }
        else
            m[prsum[j]]++;
    }
    return count;
}

int main()
{
    vector<int> vec = {1, 2, 3};
    cout << subarraySum(vec, 3) << endl;
    cout << subarrsum(vec, 3);
    return 0;
}