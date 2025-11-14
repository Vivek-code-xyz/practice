#include<iostream>
#include<string>
using namespace std;

void generate(string s,int n){
    if(s.length()==n){
        cout<<s<<endl;
        return ;
    }

    generate(s+'0',n);

    //to generate string with no consicutive one un comment this
    // if(s=="" || s[s.length()-1]=='0')
    generate(s+'1',n);
}

int main(){
    int n=4;
    generate("",n);
}
