#include <iostream>
using namespace std;
bool palindrom(int x){
    long int ans=0;
    int p=x;
    while (p>0)
    {
        ans*=10;
        ans+=p%10;
        p/=10;
    }

    if(ans==x) return true;
    else return false;

    
}
int main(){
    int a;
    cout<<"enter a number:";
    cin>>a;
    if(palindrom(12321)) cout<<"it is palindrom";
    else cout<<"it is not palindrom";
}