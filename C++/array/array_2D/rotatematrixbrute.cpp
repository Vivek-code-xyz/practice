//brute force extra space

#include<iostream>

#include<vector>
using namespace std;

vector<vector<int>> rotateby90clock(vector<vector<int>>arr){
    int n=arr.size();
    int m=arr[0].size();
    vector<vector<int>>ans(m,vector<int>(n));
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            ans[j][n-1-i]=arr[i][j];
        }
    }
    return ans;
}

vector<vector<int>> rotateby90anticlock(vector<vector<int>>arr){
    int n=arr.size();
    int m=arr[0].size();
    vector<vector<int>>ans(m,vector<int>(n));
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            ans[i][j]=arr[j][n-1-i];
        }
    }
    return ans;
}

vector<vector<int>> rotateby180degree(vector<vector<int>>arr){
    int n=arr.size();
    int m=arr[0].size();
    vector<vector<int>>ans(n,vector<int>(m));
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
           ans[n-1-i][m-1-j]=arr[i][j];
        }
    }
    return ans;
}



int main(){
    vector<vector<int>>vec={{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
    int n=vec.size();
    int m=vec[0].size();
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
           cout<<vec[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl<<endl;
    vector<vector<int>>vec2=rotateby180degree(vec);

    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
           cout<<vec2[i][j]<<" ";
        }
        cout<<endl;
    }
    return 0;
}
