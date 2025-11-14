#include<iostream>
using namespace std;

int kthGrammar(int n, int k) {
    if(n==0) return 0;

    if(k%2==0){
        int prevans=kthGrammar(n-1,k/2);
        if(prevans==0)return 1;
        else return 0;
    }
    else{
        return kthGrammar(n-1,k/2 + 1);
    }
}

int main(){
    cout<<kthGrammar(2,4);

    return 0;
}