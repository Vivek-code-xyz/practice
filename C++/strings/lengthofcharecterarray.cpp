#include <iostream>

#include <cstring>
using namespace std;

int main(){
    char str[]="hello dosto mera naam hai doraemon";
    cout<<"length of string by function is : "<<strlen(str)<<endl;
    cout<<" length by loop : ";
    int i;
    for(i=0;str[i]!='\0';i++){}
    cout<<i;
return 0;
}