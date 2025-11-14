#include<iostream>
#include<vector>
using namespace std;

int bitflips(vector<int>v,int k){
    int n=v.size();
    int flip=0;
    for(int i=0;i<n;i++){
        if(v[i]==0){
            if(i+k-1>n) return -1;
            for(int j=i;j<=i+k-1;j++){
                v[i]=!v[i];  //bit fliping
            }
            flip++;
        }
    }
    return flip;
}

int main(){
    vector<int>v={1,0,1,0};

    cout<< bitflips(v,2);
    return 0;
}