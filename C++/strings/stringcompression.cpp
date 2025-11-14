#include <iostream>
#include <vector>
#include<string>


using namespace std;

int strcompress(vector<char>v){
    int n=v.size();
    int idx=0;
    for(int i=0;i<n;i++){
        char ch=v[i];
        int count=0;
        while(i<n && v[i]==ch){
            count ++;
            i++;
        }

        if(count==1)v[idx++]=ch;
        else{
            v[idx++]=ch;
            string str=to_string(count);
            for(char val:str){
                v[idx++]=val;
            }
        }
        i--;
    }
    v.resize(idx);
    for(char k : v) cout<<k<<" ";
    return idx;
}

int main(){
    vector<char>vec={'a','a','b','b','b','c','c','c','d'};
    strcompress(vec);
    return 0;

}
