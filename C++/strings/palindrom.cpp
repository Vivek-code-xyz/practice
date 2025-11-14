#include <iostream>
#include<string>

using namespace std;

bool palindrome(string s){
    int st=0,end=s.length()-1;
    while(st<end){
        if(!isalnum(s[st])){
            st++;
            continue;
        }
        if(!isalnum(s[end])){
            end--;
            continue;
        }

        if(tolower(s[st])!=tolower(s[end]))
        return false;

        st++;
        end--;
    }
    return true;
}
int main(){
    string str="racecar";
    string str2="modern";
    cout<<palindrome(str)<<endl;
    cout<<palindrome(str2)<<endl;
    return 0;
}