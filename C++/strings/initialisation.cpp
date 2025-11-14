#include <iostream>
using namespace std;

//character array != strings.....

int main(){

    // char st[]={'a','b','c','\0'}; //valid string of three
    // cout<<st<<endl; //abc
    // char str[30];
    // cout<<"input by cin : ";
    // cin>>str; //cin takes input only upto 1st sapce
    //to take in put of phases and essays in strinng use cin.getline(str,len,delimiter)
    //whenever delimiter is inputed the function stops inputing string
    char str1[200]; //add length if you dont initiallise it first
    cout<<"enter string and enteer $ to stops the input : ";
    cin.getline(str1,200,'$');

    // cout<<"you entered by cin : "<<str<<endl;
    cout<<"you entered by cin getkine: "<<str1;
    return 0;
}