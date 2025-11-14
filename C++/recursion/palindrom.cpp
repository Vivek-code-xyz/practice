#include<iostream>
#include<string>
using namespace std;

bool ispalindrom(string s,int i,int j){
    if(i>j) return true;

    if(s[i]!=s[j]) return false;
    else return ispalindrom(s,i+1,j-1);
}

int main(){
    string s="racecar";

   cout<< ispalindrom(s,0,s.length()-1);
    return 0;
}