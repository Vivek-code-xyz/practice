#include<iostream>
using namespace std;

void generate(int n,string s,int o,int c){
    if(c==n){
        cout<<s<<endl;
        return ;
    }
    if(o<n){
       
        generate(n,s+"(",o+1,c);
    }
    if(c<o){
       
       generate(n,s+")",o,c+1);
    }
}

int main(){
    string s;
    int n=3;
    generate(n,s,0,0);
}