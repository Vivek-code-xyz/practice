#include<iostream>
#include<vector>
using namespace std;

bool safeplace(int n,int row,vector<string>&board,int col){
    for(int i=0;i<n;i++){
        if(board[i][col]=='Q') return false;
    }

    for(int i=row,j=col;i>=0&&j>=0;i--,j--){
        if(board[i][j]=='Q') return false;
    }

      for(int i=row,j=col;i>=0&&j<n;i--,j++){
        if(board[i][j]=='Q') return false;
    }

    return true;

}
void placeQueen(vector<vector<string>>&ans,int n,int row,vector<string>&board){
    if(row==n){
        ans.push_back({board});
        return;
    }


    for(int j=0;j<n;j++){
        if(safeplace(n,row,board,j)){
            board[row][j]='Q';
            placeQueen(ans,n,row+1,board);
            board[row][j]='.';
        }
    }
}

vector<vector<string>> solveNQueens(int n) {
    vector<string>board(n,string(n,'.'));
    vector<vector<string>>ans;
    placeQueen(ans,n,0,board);
    
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cout<<ans[i][j]<<" ";
        }
        cout<<endl;
    }
    return ans;
}

int main(){
    solveNQueens(4);
    return 0;
}