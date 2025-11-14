#include<iostream>
#include<vector>
using namespace std;

int main(){
   
    auto sum=[](int a,int b)->int{
        return a+b;
    };

    cout<<sum(3,5);

 return 0;
}