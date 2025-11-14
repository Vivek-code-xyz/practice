#include <iostream>
#include <vector>

using namespace std;

void merge(vector<int>a,vector<int>b){
    int n=a.size();
    int m =b.size();
    vector<int>ans(n+m,0);
    int k=0,l=0;

    for(int i=0;i<n+m;i++){
        if((a[k]<=b[l] && k<n)  || l==m) {
            ans[i]=a[k];
            k++;
        }
        else{
            if(l<m){ 
            ans[i]=b[l];
            l++;}
        }

        

    }
    cout<<"merged array is : ";

    for(int i:ans) cout<<i<<" ";
    return;
}

int main(){
   vector<int>arr={1,4,5,6};
    vector<int > brr={2,3,5,6,7,8,9};

    merge(arr,brr);
    return 0;
}