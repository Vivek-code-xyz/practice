#include <stdio.h>

int power (int x,int n){

    if(n == 0) return 1;
    
    int temp = power(x,n/2);

    if(n%2==1){
        temp = temp*temp*x;
    }
    else{
        temp = temp*temp;
    }
    return temp;
}

double negetivepower(int x,int n){
    if(n< 0){
        return 1.0/power(x,-n);
    }else{
        return power(x,n);
    }
}

int modpower(int x,int n,int mod){
        if(n == 0) return 1;
        int temp = modpower(x,n/2,mod);

        if(n%2==0){
            temp = (temp*temp*x)%mod;
        }
        else{
            temp = (temp*temp)%mod;
        }
        return temp;
}

int main(){
    int x1 = 2, n1 = 10;
    printf("Test 1: %d^%d = %d\n", x1, n1, power(x1, n1));
    printf("Expected: 1024\n\n");
}