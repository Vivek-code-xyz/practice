#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<vector<int>> mat = {{1, 2, 3, 2, 1}, {4, 5, 6}, {7, 8, 9}};
    // rows ==mat.size();
    // columns==mat[i].size();  ----> for ith row
    mat[2].push_back(34);
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            cout << mat[i][j] << " ";
        }
        cout << endl;
    }
}