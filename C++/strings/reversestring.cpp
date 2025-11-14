#include<iostream>
#include <cstring>
#include <algorithm>
using namespace std;

int main(){
    string str="vivek khasiya";

    reverse(str.begin(),str.end());

    cout<<str<<endl;
    
    //or
    
    // int st=0,end=strlen(str)-1;
    // while(end>st){
    //     swap(str[st++],str[end--]);
    // }
    
    return 0;
}