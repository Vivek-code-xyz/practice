#include<iostream>
#include<vector>
#include<string>
#include<algorithm>

using namespace std;
string longestCommonPrefix(vector<string>& strs) {
    int n=strs.size();
    sort(strs.begin(),strs.end());
    string s="";
    string first=strs[0];
    string last=strs[n-1];
    for(int i=0;i<strs[0].size();i++){
      if(first[i]==last[i]) s+=first[i];
        else break;
    }
    return s;
}

int main(){
    vector<string>v={"vivek","vivel","vilson","vimal"};
    cout<<longestCommonPrefix(v);

    return 0;
}

