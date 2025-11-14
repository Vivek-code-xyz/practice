#include <iostream>
#include<vector>

using namespace std;

int countprime(int n){
    vector<bool>vec(n+1,true);
    int ans=0;

    for(int i=2;i<n;i++){
        if(vec[i]==true) ans++;

        for(int j=i*2;j<n;j+=i){
            vec[j]==false;
        }
    }
    return ans;
}
int main(){
    int a;
    cout<<"enter a number ";
    cin>>a;
    cout<<"no of prime numbers is "<<countprime(a);
    return 0;
}