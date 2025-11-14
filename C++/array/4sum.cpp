#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> sumof4(vector<int> arr, int target)
{
    int n = arr.size();
    sort(arr.begin(), arr.end());
    vector<vector<int>> ans;
    for (int i = 0; i < n; i++)
    {
        if (i > 0 && arr[i] == arr[i - 1])
            continue;
        for (int j = i + 1; j < n; j++)
        {
            if (j > (i + 1) && arr[j] == arr[j - 1])
                continue;
            int k = j + 1, l = n - 1;
            while (k < l)
            {
                int sum = arr[i] + arr[j] + arr[k] + arr[l];
                if (sum == target)
                {
                    ans.push_back({arr[i], arr[j], arr[k], arr[l]});
                    k++;
                    l--;
                    while (k < l && arr[k] == arr[k - 1])
                        k++;
                }
                else if (sum > target)
                    l--;
                else
                    k++;
            }
        }
    }

    return ans;
}

int main()
{
    vector<int> vec = {-1, -1, 2, 1, 2, -2, 1, 0};
    vector<vector<int>> vec2 = sumof4(vec, 0);

    for (int i = 0; i < vec2.size();i++)
    {
        for (int j = 0; j < vec2.size();j++)
        {
            cout << vec2[i][j] << " ";
        }
        cout << endl;
    }
}
