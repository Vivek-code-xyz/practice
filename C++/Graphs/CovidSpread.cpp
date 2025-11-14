#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int r; int c;
bool valid(int i,int j){
    if(i>=0&&i<r && j>=0&&j<c) return true;
    return false;
}

int row[4]={-1,1,0,0};
int col[4]={0,0,-1,1};

int helpaterp(vector<vector<int>> hospital) {
    // code here
    r=hospital.size();
    c=hospital[0].size();
    queue<pair<int,int>>q;
    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++){
            if(hospital[i][j]==2){
                q.push({i,j});
            }
        }
    }

    int time=0;

    while(q.size()){
        int curr_size=q.size();

        time++;
        while(curr_size--){
            int i=q.front().first;
            int j=q.front().second;
            q.pop();

            for(int k=0;k<4;k++){
                if(valid(i+row[k],j+col[k])){
                    if(hospital[i+row[k]][j+col[k]]==1){
                        hospital[i+row[k]][j+col[k]]=2;
                        q.push({i+row[k],j+col[k]});
                    }
                }
            }
        }
    }

    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++){
            if(hospital[i][j]==1) return -1;
        }
    }
    return (time==0)?0:time-1;
}

int main() {
    // Hardcoded test case
    vector<vector<int>> hospital = {
        {2, 1, 0, 2, 1},
        {1, 0, 1, 2, 1},
        {1, 0, 0, 2, 1}
    };

    int result = helpaterp(hospital);
    cout << "Minimum time for all patients to be treated: " << result << endl;

    return 0;
}
