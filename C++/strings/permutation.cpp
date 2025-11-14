#include <iostream>
using namespace std;

bool chek(int arr[],int brr[]){
    for(int i=0;i<26 ;i++){
        if(arr[i] != brr[i]) return false;
    }
    return true;
}

bool permu(string s1,string s2){
   int freq[26]={0};
   for(int i=0;i<s2.length();i++){
    freq[s2[i]-'a']++;
   }
   for(int i=0;i<s1.length();i++){ 
   
    int windfreq[26]={0};
   int windidx=0;
   int idx=i;
   while(windidx<s2.length() && idx<s1.length()){
    windfreq[s1[idx]-'a'] ++;
    windidx ++;
    idx ++;
   }
  if(chek(freq,windfreq)) return true;

}
return false;

}

int main(){
    string s1="missisippi";
    string s2="xy";
    cout<<"is string 2 is exist in string 1 (in any permutation) : "<<(permu(s1,s2))?"yes":"no ";

    return 0;

}