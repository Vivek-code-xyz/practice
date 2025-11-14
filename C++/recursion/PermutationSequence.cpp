#include<iostream>
#include<string>

using namespace std;

string helper(string str,int k,string ans){
    int n=str.size();
    if(n==0) return ans;
    int fact=1;
    for(int i=2;i<n;i++) fact *=i;

    int idx=k/fact;
    if(k%fact==0) idx--;
    char ch=str[idx];
    string left=str.substr(0,idx);
    string right=str.substr(idx+1);

    int p=1;
    if(k%fact==0) p=fact;
    else p=k%fact;
    return helper(left+right,p,ans+ch);
}


string getPermutation(int n, int k) {

    string str="";
    for(int i=1;i<=n;i++) str+=to_string(i);
 
    return helper(str,k,"");
}


int main(){
    int n= 4 ;
    int k= 1 ;
    string s=getPermutation(n,k);
    cout<<s;
    return 0;
}