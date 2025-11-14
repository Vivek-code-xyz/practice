#include<iostream>
#include<vector>
using namespace std;


vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int>ans;
    int m=matrix.size();
    int n=matrix[0].size();
    int str=0,endr=m-1;
    int stc=0,endc=n-1;

    while(stc<=endc && str<=endr){
        for(int i=stc;i<=endc;i++){
            ans.push_back(matrix[str][i]);
        }
        for(int i=str+1;i<=endr;i++){
            ans.push_back(matrix[i][endc]);
        }
        for(int i=endc-1;i>=stc;i--){
            if(str==endr) break;
            ans.push_back(matrix[endr][i]);
        }
        for(int i=endr-1;i>=str+1;i--){
            if(stc==endc) break;
            ans.push_back(matrix[i][stc]);
        }

        str++;
        endr--;
        stc++;
        endc--;
    }
    return ans;
}

int main(){
   vector<vector<int>>vec={{1,2,3,4},{5,6,7,8},{7,6,5,4},{3,2,1,0}};
    vector<int>spi=spiralOrder(vec);

    for(int i:spi) cout<<i<<" ";
}