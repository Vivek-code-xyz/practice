#include <iostream>
using namespace std;
//for three steps allowed
 int stairway3(int n){
    if(n==1)return 1;
    if(n==2)return 2;
    if(n==3)return 4;

    return stairway3(n-1)+stairway3(n-2)+stairway3(n-3);
}

//for two steps allowed
int stairway2(int n){
    if(n==1)return 1;
    if(n==2)return 2;
   

    return stairway2(n-1)+stairway2(n-2);
}


int main(){
    cout<<stairway2(14)<<endl;
    cout<<stairway3(14);
    return 0;
}