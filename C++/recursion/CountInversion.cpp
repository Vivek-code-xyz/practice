#include<iostream>
#include<vector>
using namespace std;
int c=0;

int Inverrsion(vector<int>&a,vector<int>&b){
    int i=0,j=0;
    int count=0;
    while(i<a.size()&& j<b.size()){
        if(a[i]>b[j]) {
            count+=(a.size()-i);
            j++;
        }
        else i++;
    }
    return count;
}

void merge(vector<int>&a, vector<int>&b,vector<int>&ans){
    int i=0,j=0,k=0;
    while(i<a.size() && j<b.size()){
        if(a[i]<=b[j]){
            ans[k]=a[i];
            i++;k++;
        }
        else{
            ans[k]=b[j];
            j++;k++;
        }
    }
    if(i==a.size()){
        while(j<b.size())
       { ans[k]=b[j];
        j++;k++;}
    }
    if(j==b.size()){
        while(i<a.size()){
            ans[k]=a[i];
            i++;k++;
        }
    }

    return;
}

void mergesort(vector<int>&ans){
    int n=ans.size();
    if(n==1)return ;
    int n1=n/2,n2=n-(n/2);
    vector<int>a(n1);
    vector<int>b(n2);
    for(int i=0;i<n1;i++) a[i]=ans[i];
    for(int i=0;i<n2;i++) b[i]=ans[i+n1];

    mergesort(a);
    mergesort(b);

    //calculating count....
    c += Inverrsion(a,b);
    
    merge(a,b,ans);
/// improving space complexity
    a.clear();
    b.clear();
}

int main(){
  
    vector<int>v={5,1,3,0,4,2,6};
    mergesort(v);

  cout<<"count inversion of array is : "<<c;
}