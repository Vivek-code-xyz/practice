#include <iostream>
using namespace std;
#include <vector>
#include<queue>

int row[8] = {-1, -1, -1, 1, 1, 1, 0, 0};
int col[8] = {-1, 0, 1, -1, 0, 1, -1, 1};

bool valid(int i, int j, int n)
{
    return i >= 0 && j >= 0 && i < n && j < n;
}
int shortestPathBinaryMatrix(vector<vector<int>> &grid)
{
    int n = grid.size();
    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1)
        return -1;

    if (n == 1)
        return 1;

    queue<pair<int, int>> q;
    q.push({0, 0});
    int step = 1;
    grid[0][0] = 1;

    while (q.size())
    {
        int count = q.size();
        while (count--)
        {
            int i = q.front().first;
            int j = q.front().second;
            q.pop();
            if (i == n - 1 && j == n - 1)
                return step;
            for (int k = 0; k < 8; k++)
            {
                int ni = i + row[k];
                int nj = j + col[k];
                if (valid(ni, nj, n) && grid[ni][nj] == 0)
                {

                    grid[ni][nj] = 1;
                    q.push({ni, nj});
                }
            }
        }
        step++;
    }

    return -1;
}

int main()
{

    vector<vector<int>> matrix={
        {0,0,0},
        {1,1,0},
        {1,1,0}
    };

    int path=shortestPathBinaryMatrix(matrix);

    cout<<"shortest path from 1st corner to last is : "<<path<<endl;
    return 0;
}