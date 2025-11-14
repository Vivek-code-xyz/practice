#include <iostream>
using namespace std;
int main(){
    int n;
    int c=1;
    cout<<"Enter a number:";
    cin>>n;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=n;j++){ 
        cout<<(char)(c+64)<<" ";
        c++;
        }
        cout<<endl;
    }
    return 0;
}