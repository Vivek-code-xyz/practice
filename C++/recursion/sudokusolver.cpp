#include<iostream>
#include<vector>
using namespace std;
bool issafe(vector<vector<char>>& board,int row,int col,char dig){
    for(int i=0;i<9;i++){
        if(board[row][i]==dig) return false;
        if(board[i][col]==dig) return false;
    }
    int str=(row/3)*3;
    int stc=(col/3)*3;

    for(int i=str;i<str+3;i++){
        for(int j=stc;j<stc+3;j++){
            if(board[i][j]==dig) return false;
        }
    }

    return true;
}

bool helper(vector<vector<char>>& board,int row,int col){
    if(row==9) return true;

    int nextrow=row;
    int nextcol=col+1;
    if(nextcol==9){
        nextrow=row+1;
        nextcol=0;
    }

    if(board[row][col]!='.'){
       return helper(board,nextrow,nextcol);
    }

   for(char i='1';i<='9';i++){
        if(issafe(board,row,col,i)){
            board[row][col]=i;
           if( helper(board,nextrow,nextcol)){
            return true;
           }
           board[row][col]='.';
        }

   }

   return false;
}
void solveSudoku(vector<vector<char>>& board) {
    helper(board,0,0);
    return;
}

int main(){
    vector<vector<char>>ans;
    solveSudoku(ans);
    return 0;
}