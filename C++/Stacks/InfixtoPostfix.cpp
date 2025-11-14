#include<iostream>
#include<stack>
#include<string>
using namespace std;

int pri(char ch){
    if(ch=='+' || ch=='-') return 2;
    else return 4;
}
string solve(string val1,string val2,char ch){
   string ans="";
   ans+=val1;
   ans+=val2;
   ans.push_back(ch);
   return ans;
}

int main(){
    string s="(7+9)*4/8-3";
    stack<string>val;
    stack<char>opp;
    for(int i=0;i<s.size();i++){
        if(s[i]>=48&&s[i]<=57){
            val.push(to_string(s[i]-48));
        }
        else{
            if(opp.size()==0 ){
                opp.push(s[i]);
            }
            else if(s[i]=='(' || opp.top()=='(') opp.push(s[i]);
            else if(s[i]==')'){
                while(opp.top()!='('){
                    string val2=val.top();
                    val.pop();
                    string val1=val.top();
                    val.pop();
                    char ch=opp.top();
                    opp.pop();
                    string ans=solve(val1,val2,ch);
                    val.push(ans);
                }
                opp.pop();
            }
            else if( pri(s[i])>pri(opp.top())) opp.push(s[i]);
            else { 
                while(opp.size()>0 && pri(s[i])<=pri(opp.top())){
                string val2=val.top();
                val.pop();
                string val1=val.top();
                val.pop();
                char ch=opp.top();
                opp.pop();
                string ans=solve(val1,val2,ch);
                val.push(ans);
                }
                opp.push(s[i]);

            }
            
        }
    }
    while(opp.size()>0){
        string val2=val.top();
        val.pop();
        string val1=val.top();
         val.pop();
        char ch=opp.top();
        opp.pop();
        string ans=solve(val1,val2,ch);
        val.push(ans);
    }

    cout<<"ans = "<<val.top();
}