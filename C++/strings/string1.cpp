#include <iostream>
using namespace std;
int main(){
    string str="vivek";
    string str1="khasiya ";

    string str2 =str1+str; //direct concationation

    cout<<str2<<endl; //khasiya vivek

    if(str==str1) cout<<"hurraaay!"; //direct compaarision
    else cout<<"strings are not same";
    return 0;
}