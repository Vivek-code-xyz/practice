#include<iostream>
#include <algorithm>
#include <cmath>
using namespace std;
int powerof(int base,int exp){
    int result =1;
    while(exp>0){
        result*=base;
        exp--;
    }
    return base;
}

int countdig(int n){
    int ans=0;
    while(n>0){
        ans++;
        n/=10;
    }
    return ans;
}
bool armstrong(int n,int digit){
    int num=n;
    int ans=0;
    while(n>0){
      ans+= powerof(n%10,digit);
      n/=10;
    }
    if(ans==num) return true;

    return false;
}

int main(){
    int n;
    cout<<"enter a number : ";
    cin>>n;

    int digit=countdig(n);

    cout<<"is armstrong number ? --> "<<armstrong(n,digit);
    return 0;
}