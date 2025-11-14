#include<iostream>
using namespace std;
int main(){
    string s1="vivek khasiya is the honest pearson in the world";
    string s2;
    s2=move(s1);  //move function moves content of one string or contaiiner to other container
    //it prevents space because it stops coping rather it moves contant from one to another variable
    //application in competitive programming 

    cout<<"string s1 : "<<s1<<endl;
    cout<<"string s2 : "<<s2<<endl;
    return 0;
}