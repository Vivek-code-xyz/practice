#include<iostream>
using namespace std;

int sum(int n){
    if(n==1)return 1;
    return n+sum(n-1);
}

int main(){
    int a;
    cout<<"enter a natural number : ";
    cin>>a;
    cout<<"sum of first n numbers is = "<<sum(a);
    return 1;

}