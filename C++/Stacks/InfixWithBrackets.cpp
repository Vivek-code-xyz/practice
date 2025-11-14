#include<iostream>
#include<stack>
using namespace std;

int pri(char ch){
    if(ch=='+' || ch=='-') return 2;
    else return 4;
}
int solve(int val1,int val2,char ch){
   if(ch =='+') return val1+val2;
   if(ch =='-') return val1-val2;
   if(ch =='*') return val1*val2;
   if(ch =='/') return val1/val2;
}

int main(){
    string s="(2+6)*4/8-3";
    stack<int>val;
    stack<char>opp;
    for(int i=0;i<s.size();i++){
        if(s[i]>=48&&s[i]<=57){
            val.push(s[i]-48);
        }
        else{
            if(opp.size()==0 ){
                opp.push(s[i]);
            }
            else if(s[i]=='(' || opp.top()=='(') opp.push(s[i]);
            else if(s[i]==')'){
                while(opp.top()!='('){
                    int val2=val.top();
                    val.pop();
                    int val1=val.top();
                    val.pop();
                    char ch=opp.top();
                    opp.pop();
                    int ans=solve(val1,val2,ch);
                    val.push(ans);
                }
                opp.pop();
            }
            else if( pri(s[i])>pri(opp.top())) opp.push(s[i]);
            else { 
                while(opp.size()>0 && pri(s[i])<=pri(opp.top())){
                int val2=val.top();
                val.pop();
                int val1=val.top();
                val.pop();
                char ch=opp.top();
                opp.pop();
                int ans=solve(val1,val2,ch);
                val.push(ans);
                }
                opp.push(s[i]);

            }
            
        }
    }
    while(opp.size()>0){
        int val2=val.top();
        val.pop();
        int val1=val.top();
         val.pop();
        char ch=opp.top();
        opp.pop();
        int ans=solve(val1,val2,ch);
        val.push(ans);
    }

    cout<<"ans = "<<val.top();
}