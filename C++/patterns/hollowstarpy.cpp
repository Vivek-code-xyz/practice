#include <iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the no. of line:";
    cin>>n;
    for(int i=1;i<=n;i++){
        for(int j=n-i;j>0;j--) cout<<" ";
        cout<<"*";
        for(int k=1;k<2*i-2;k++) cout<<" ";
      if(i!=1)  cout<<"*";
        cout<<endl;
    }
    for(int i=1;i<n;i++){
        for(int j=1;j<=i;j++) cout<<" ";
        cout<<"*";
        for( int j=0; j<=2*(n-i)-3;j++ )cout<<" ";
        if(i!=n-1) cout<<"*";
        cout <<endl;
    }
    return 0;
    
}