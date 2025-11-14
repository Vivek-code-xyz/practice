#include <iostream>
#include <vector>
using namespace std;


bool search(vector<vector<int>> &matrix, int target);



//best binary search O(log(n*m))
bool binary(vector<vector<int>> &matrix, int target,int mid){
    int m = matrix[0].size();
    int cst = 0, cend = m - 1;
    while (cst <= cend)
    {
        int cmid = cst + (cend - cst) / 2;
        if (target == matrix[mid][cmid])
            return true;
        else if (target > matrix[mid][cmid])
            cst = cmid + 1;
        else
            cend = cmid - 1;
    }
    return false;
}

bool searchMatrix(vector<vector<int>> &matrix, int target)
{
    int n = matrix.size();
    int m = matrix[0].size();
    int st = 0, end = n - 1;
    while (st <= end)
    {
        int mid = st + (end - st) / 2;
        if (target >= matrix[mid][0] && target <= matrix[mid][m - 1])
        {
          return binary(matrix,target,mid); 
        }
        else if (target > matrix[mid][m - 1])
            st = mid + 1;
        else
            end = mid - 1;
    }
   
}

int main()
{
    vector<vector<int>> arr = {{1, 2, 3}, {4, 6, 7}, { 8, 9,10}};
    cout << searchMatrix(arr, 3) << endl;
    cout << searchMatrix(arr, 7) << endl;
   
    return 0;
}

//alternate approch O(n+m)

bool search(vector<vector<int>> &matrix, int target){
    int n=matrix.size();
    int m=matrix[0].size();
    int r=0,c=m-1;
    while(r<n&&c>=0){
        if(target==matrix[r][c]) return true;
        else if(target<matrix[r][c]) c--;
        else r++;
    }
    return false;
}

//my approch O(nlogm)  for any shorted table ie any matrix dynamic
bool mysearch(vector<vector<int>> &mat, int tar){
    int n=mat.size();
    for(int i=0;i<n;i++){
        
        int j=mat[i].size();
        if(tar>mat[i][j-1]) continue;
        int st=0,end=j-1;
        while(st<=end){
            int mid = st + (end - st)/2 ;
            if(tar==mat[i][mid]) return true;
            else if(tar<mat[i][mid]) end=mid-1;
            else st=mid+1;
        }
        return false;
    }
}