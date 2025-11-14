// sorting

#include <iostream>
#include <vector>

using namespace std;
int majority(vector<int> v)
{
    int n = v.size();
    int fr=0;
    int ans=0;
    for(int i=0;i<n;i++){
        if(fr==0) ans = v[i];
        if(v[i]==ans) fr++;
        else fr--;
    }
   return ans;
}

int main()
{
    vector<int> vec = {56, 50, 23, 50, 21, 50, 67, 50, 54, 50, 50, 50, 21};
   cout<< majority(vec);
    return 0;
}