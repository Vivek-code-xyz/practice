// BY SHRADHA MAAM

#include <iostream>
#include <vector>
#include <set>
using namespace std;

    set<vector<int>>s;

void combination(vector<int> &cand, vector<int> &arr, vector<vector<int>> &v, int idx, int target)
{
    if (idx == cand.size() || target < 0)
        return;
    if (target == 0)
    {
        if (s.find(arr) == s.end())
        {
            v.push_back(arr);
            s.insert(arr);
            return;
        }
    }
    arr.push_back(cand[idx]);
    combination(cand, arr, v, idx + 1, target - cand[idx]);
    combination(cand, arr, v, idx, target - cand[idx]);

    arr.pop_back();

    combination(cand, arr, v, idx + 1, target);
}

vector<vector<int>> combinationSum(vector<int> &candidates, int target)
{
    vector<vector<int>>ans;
        vector<int>arr;
        combination(candidates,arr,ans,0,target);
        return ans;
}

int main()
{

    vector<int> candidates = {2, 3, 6, 7};
    int target = 7;

    vector<vector<int>> result = combinationSum(candidates, target);

    // Output
    for (auto &comb : result)
    {
        for (int num : comb)
            cout << num << " ";
        cout << endl;
    }

    return 0;
}
