#include <iostream>
using namespace std;
double power(double x,int n){

   double ans=1;
   if(n<0){
    x=1/x;
    n=-n;
   }
   while(n>0){ 
   if(n%2==1){
    ans*=x;
   }
   x*=x;
   n/=2;
    }
    return ans;
}

int main(){
   int a;
   int b;
   cout<<"enter number and its power: ";
   cin>>a>>b;
    cout<<power(a,b);
    return 0;
}