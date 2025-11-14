#include<iostream>
using namespace std;
#include<stack>
#include<math.h>

int solve(int val1,int val2,char ch){
   if(ch =='+') return val1+val2;
   if(ch =='-') return val1-val2;
   if(ch =='*') return val1*val2;
   if(ch =='/') return val1/val2;
   if(ch == '%') return val1%val2;
   if(ch == '$') return pow(val1,val2);
}
int main(){
    string s;
    cout<<"Enter the Postfix Expression: ";
    cin>>s;
    stack<int>val;
    for(int i=0;i<s.size();i++){
        if(s[i]>=48&&s[i]<=57){ //check for the digits 0 to 9 
            val.push(s[i]-48);
        }
        else{
          int val2=val.top();
          val.pop();
          int val1=val.top();
          val.pop();
          int ans=solve(val1,val2,s[i]);
          val.push(ans);
        }
    }

    cout<<"Postfix Evaluation is : "<<val.top()<<endl;

    return 0;
}