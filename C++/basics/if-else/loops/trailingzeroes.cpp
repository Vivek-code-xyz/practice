#include <iostream>
using namespace std;
int main(){
    int i;
    cout<<"enter  a number : ";
    cin>>i;
    int ans=0;
    while(i>=5){
        ans+=i/5;
        i/=5;
    }

    cout<<"factorial of a given number has "<<ans<<"no of zeroes at end ";
    return 0;
}