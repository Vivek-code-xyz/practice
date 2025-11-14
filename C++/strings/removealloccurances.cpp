#include<iostream>
using namespace std;

    string remov(string s,string part){
        while(s.length()>0 && s.find(part)<s.length()){
            s.erase(s.find(part),part.length());
        }
        return s;
    }


int main(){
    string str="abcabcabcabcabcaba";
    cout<<remov(str,"abc");
    return 0;
}