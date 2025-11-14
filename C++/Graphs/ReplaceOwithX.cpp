#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int r; int c;
int row[4] = {-1, 1, 0, 0};
int col[4] = {0, 0, -1, 1};

bool valid(int i,int j){
    return i>=0 && i<r && j>=0 && j<c;
}

void solve(vector<vector<char>>& board) {
    r=board.size();
    c=board[0].size();
    queue<pair<int,int>>q;
    for(int i=0;i<c;i++){
        if(board[0][i]=='O'){
            board[0][i]='R';
            q.push({0,i});
        }
    }
    for(int i=1;i<r;i++){
        if(board[i][0]=='O'){
            board[i][0]='R';
            q.push({i,0});
        }
    }
    for(int i=1;i<c;i++){
        if(board[r-1][i]=='O'){
            board[r-1][i]='R';
            q.push({r-1,i});
        }
    }
    for(int i=1;i<r-1;i++){
        if(board[i][c-1]=='O'){
            board[i][c-1]='R';
            q.push({i,c-1});
        }
    }

    while(!q.empty()){
        int i=q.front().first;
        int j=q.front().second;
        q.pop();

        for(int k=0;k<4;k++){
            if(valid(i+row[k],j+col[k])){
                if(board[i+row[k]][j+col[k]]=='O'){
                    board[i+row[k]][j+col[k]]='R';
                    q.push({i+row[k],j+col[k]});
                }
            }
        }
    }

    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++){
            if(board[i][j]=='O'){
                board[i][j]='X';
            }
            else if(board[i][j]=='R'){
                board[i][j]='O';
            }
        }
    }
}

int main() {
    // Hardcoded test case
    vector<vector<char>> board = {
        {'X','X','X','X'},
        {'X','O','O','X'},
        {'X','X','O','X'},
        {'X','O','X','X'}
    };

    cout << "Original Board:\n";
    for (auto &row : board) {
        for (char ch : row) cout << ch << " ";
        cout << "\n";
    }

    solve(board);

    cout << "\nProcessed Board:\n";
    for (auto &row : board) {
        for (char ch : row) cout << ch << " ";
        cout << "\n";
    }

    return 0;
}
