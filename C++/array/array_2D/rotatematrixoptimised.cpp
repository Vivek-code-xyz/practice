// optimised for spaces....

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void transpose(vector<vector<int>> &arr)
{
    int n = arr.size();

    for (int i = 0; i < n; i++)
    {
        for (int j = i; j < n; j++)
        {
            swap(arr[i][j], arr[j][i]);
        }
    }
    return;
}
void rotateby90clock(vector<vector<int>> &arr)
{
    transpose(arr);
    int n = arr.size();
    for (int i = 0; i < n; i++)
    {
        int st = 0, end = n - 1;
        while (st <= end)
        {
            swap(arr[i][st], arr[i][end]);
            st++;
            end--;
        }
    }
    return;
}

void rotateby90anticlock(vector<vector<int>> &arr)
{
   
    transpose(arr);
    int n = arr.size();
    for (int i = 0; i < n; i++)
    {
        int st = 0, end = n - 1;
        while (st <= end)
        {
            swap(arr[st][i], arr[end][i]);
            st++;
            end--;
        }
    }
    return;
}

void rotateby180degree(vector<vector<int>> &arr)
{
    int n = arr.size();
    int st = 0, end = n - 1;

    reverse(arr.begin(), arr.end());
    for (int i = 0; i < n; i++)
    {
        while (st <= end)
        {
            swap(arr[i][st], arr[i][end]);
            st++;
            end--;
        }
    }
    return ;
}

int main()
{
    vector<vector<int>> vec = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
    int n = vec.size();
    
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << vec[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl
         << endl;
     rotateby180degree(vec);

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << vec[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
