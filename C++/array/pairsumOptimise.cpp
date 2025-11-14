#include <iostream>
#include <vector>
using namespace std;
vector<int> pairsum(vector<int> &v, int tar)
{
    int n = v.size();
    vector<int> ans;
    for (int i = 0, j = n - 1; i < j; i++, j--)
    {
        if (v[i] + v[j] > tar)
            j--;
        else if (v[i] + v[j] < tar)
            i++;
        else
        {
            ans.push_back(v[i]);
            ans.push_back(v[j]);
            cout << "target sum pair = " << ans[0] << "," << ans[1];
            return ans;
        }
    }
}

int main()
{
    int n;
    cout << "enter size of sorted array : ";
    cin >> n;
    vector<int> arr(n);
    cout << "enter elements : ";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int target;
    cout << "Enter target sum : ";
    cin >> target;
    pairsum(arr, target);
    return 0;
}