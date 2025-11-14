#include<iostream>
#include<cmath>
using namespace std;

bool isprime(int a){                                //time complexity --> log(n) + sqrt(n)
                                                    // space complexity --> log(n)
    for(int i=2;i<=sqrt(a);i++){
        if(a%i==0) return false;
    }
    return true;
}

int smallestValue(int n) {
    if(isprime(n)) return n;
    if(n==4) return 4;
    int sum=0;
    for(int i=2;i<sqrt(n);i++){
        int m=n;
        if(n%i==0 && isprime(i)){
            while(m%i==0){
                sum+=i;
                m/=i;
            }
        }  
    }
    for(int i=sqrt(n);i>1;i--){
               int m=n;
        if(n%(n/i)==0 && isprime(n/i)){
             while(m%(n/i)==0){
                sum+=(n/i);
                m/=(n/i);
            }
        }
    }
    
    return smallestValue(sum);
}

int main(){
    int n;
    cout<<"Enter Number : ";
    cin>>n;
    cout<<"Smallest value after replacing with prime numbers is : "<<smallestValue(n);

    return 0;
}
