#include <iostream>
using namespace std;


int main(){
    int n;
    cout<<"Enter a number:";
    cin>>n;
    bool flag=false;
    for(int i=2;i*i<=n;i++){
        if(n%i==0){
            flag = true;
            break;
        }
    }
    if(flag==true) cout<<"non prime number";
    else cout << "prime number";
    return 0;
}
