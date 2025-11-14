#include<iostream>
#include<vector>
using namespace std;

void printsubset(string str,string ans,int i){
 if(i==str.length()) {
    cout<<ans<<endl;
     return;
    }
    char ch=str[i];
    printsubset(str,ans+ch,i+1);
    printsubset(str,ans,i+1);
}


int main(){
    string str="abc";
   printsubset(str,"",0);
    return 0;
}