#include <iostream>
using namespace std;

int fact(int n){
    int x=1;
    for (int i=2;i<=n;i++){
        x*=i;
    }
        return x;
}

int main(){
    int a;
    cin>>a;
    cout <<"factorial is " <<fact(a);
     
    return 0;
   
}