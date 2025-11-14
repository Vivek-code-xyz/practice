#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int r, c;

bool valid(int i, int j) {
    return i >= 0 && i < r && j >= 0 && j < c;
}

int rowDir[4] = {0, 0, -1, 1};
int colDir[4] = {-1, 1, 0, 0};

int numIslands(vector<vector<char>>& grid) {
    r = grid.size();
    c = grid[0].size();
    int count = 0;
    queue<pair<int,int>> q;

    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (grid[i][j] == '1') {
                count++;
                q.push({i, j});
                grid[i][j] = '0';

                while (!q.empty()) {
                    int nr = q.front().first;
                    int nc = q.front().second;
                    q.pop();
                    for (int k = 0; k < 4; k++) {
                        int newR = nr + rowDir[k];
                        int newC = nc + colDir[k];

                        if (valid(newR, newC) && grid[newR][newC] == '1') {
                            q.push({newR, newC});
                            grid[newR][newC] = '0';
                        }
                    }
                }
            }
        }
    }
    return count;
}

int main() {
    // Hardcoded test grid
    vector<vector<char>> grid = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };

    cout << "Number of islands: " << numIslands(grid) << endl;

    return 0;
}
