#include<iostream>
#include<string>
using namespace std;

string countAndSay(int n){
    if(n==1) return "1";

    string str= countAndSay(n-1); //returns final string....
    //compresing string
    char ch=str[0];
    int freq=1;
    string ans="";

    for(int i=1;i<str.size();i++){
        if(ch==str[i]) freq++;
        else{ /// for different number..
            ans+=(to_string(freq)+ch);
            freq=1;
            ch=str[i];
        }
    }
    ans+=(to_string(freq)+ch);

    return ans;
}


int main(){
    int n=4;
    string s=countAndSay(n);

    cout<<s<<endl;
}