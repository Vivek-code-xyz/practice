#include<iostream>
#include<vector>
using namespace std;
//iterative
string skipchar(string str,char a){
    string ans="";
    for(int i=0;i<str.size();i++){
        if(str[i]!=a) ans+=str[i]; //or ans.push_back(str[i])
    }
    return ans;
}

//recursive
void removechar(string str,char a,int i,string ans){
    if(i==str.size()){
       cout<<ans;
        return; 
    }
    char ch=str[i];
    if(ch==a) removechar(str, a,i+1,ans);
    else removechar(str, a,i+1,ans+ch);
    
}


int main(){
    string str="my name is vivek";
   removechar(str,'a',0,"");
    return 0;
}