#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

    string revword(string s){
        int n=s.length();
        reverse(s.begin(),s.end());
        string ans="";
        for(int i=0;i<n;i++){
            string word="";
            while(i<n && s[i]!=' '){
                word+=s[i];
                i++;
            }
            reverse(word.begin(),word.end());

            ans+=" "+word;
        }

        return ans.substr(1);

    }
int main (){

    string s1;
    cout<<"enter string : ";
    getline(cin,s1);
    cout<<revword(s1);
    return 0;
}