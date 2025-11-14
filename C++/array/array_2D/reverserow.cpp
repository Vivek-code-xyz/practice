#include <iostream>
#include <vector>
using namespace std;

void reverserow(vector<vector<int>>&arr){
    int n=arr.size();
    for(int i=0;i<n;i++){
       int j=arr[i].size(); 
       int st=0,end=j-1;
       while(st<end)
       {
        swap(arr[i][st++],arr[i][end--]);
       }
    }
    return ;
}

int main()
{
    vector<vector<int>> mat = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
   
   
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            cout << mat[i][j] << " ";
        }
        cout << endl;
    }
    
    cout << endl;
  
    reverserow(mat);

    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            cout << mat[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}