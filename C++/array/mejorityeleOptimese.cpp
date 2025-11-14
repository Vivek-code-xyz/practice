// sorting

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int majority(vector<int> v)
{
    int n = v.size();
    sort(v.begin(), v.end());
    // for(int i:v){
    //     cout<<i<<" ";
    // }
    int fr = 1;
    int ans = v[0];
    for (int i = 1; i < n; i++)
    {
        if (v[i] == v[i - 1])
        {
            fr++;
            if (fr > n / 2)
                return ans;
        }
        else
        {
            ans = v[i];
            fr = 1;
        }
    }
}

int main()
{
    vector<int> vec = {56, 50, 23, 50, 21, 50, 67, 50, 54, 50, 50, 50, 21};
   cout<< majority(vec);
    return 0;
}