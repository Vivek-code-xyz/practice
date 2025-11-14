#include<iostream>
using namespace std;

int gcd(int a,int b){
    if(a==0) return b;

    return gcd(b%a,a);
}
int main(){
    int a,b;
    cout<<"enter two numbers whose hcf to be calculated: "<<endl;
    cin>>a>>b;
    cout<<"hcf : "<<gcd(a,b);
    return 0;
}