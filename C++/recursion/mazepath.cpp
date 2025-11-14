#include<iostream>
#include <string>
using namespace std;
    int maze(int row,int col){
        if(row==1 && col==1) return 1;
        if(row<1 ||col<1) return 0;

        int left=maze(row,col-1);
        int up=maze(row-1,col);

        return left+up;
    }

    void printmaze(int row,int col,string str){
        if(row==1 && col==1) {
            cout<<str;
            cout<<endl;
            return ;
        }
        if(row<1 ||col<1) return ;

        printmaze(row,col-1,str+'R');
        printmaze(row-1,col,str+'D');
    }

int main(){
    cout<<maze(3,4);
    cout<<endl;

    printmaze(3,4,"");
    return 0;

}