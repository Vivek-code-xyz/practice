#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
bool isAnagram(string s, string t) {
    sort(s.begin(),s.end());
    sort(t.begin(),t.end());

    if(s==t) return true;
    return false;
}

int main(){

    string str="analog";
    string s="lognah";
    cout<<isAnagram(s,str);

    return 0;

}