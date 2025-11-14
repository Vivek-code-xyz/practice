#include<iostream>
using namespace std;
#include<stack>

int solve(int val1,int val2,char ch){
   if(ch =='+') return val1+val2;
   if(ch =='-') return val1-val2;
   if(ch =='*') return val1*val2;
   if(ch =='/') return val1/val2;
}
int main(){
    string s="-/*+79483";
    stack<int>val;
    for(int i=s.size()-1;i>=0;i--){
        if(s[i]>=48&&s[i]<=57){
            val.push(s[i]-48);
        }
        else{
          int val1=val.top();
          val.pop();
          int val2=val.top();
          val.pop();
          int ans=solve(val1,val2,s[i]);
          val.push(ans);
        }
    }

    cout<<val.top()<<endl;
}