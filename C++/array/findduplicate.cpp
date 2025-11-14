#include <iostream>
#include <vector>
#include<unordered_set>
using namespace std;
// slow and fast pointer approch.....
int findDuplicate(vector<int>& arr) {
    int n=arr.size();
    int sl=arr[0];
    int fst=arr[0];
   do{
    sl=arr[sl];
    fst=arr[arr[fst]];
   }while(sl!=fst);

   sl=arr[0];

   while(sl!=fst){
    sl=arr[sl];
    fst=arr[fst];
   }
   return fst;
}
// by hash map....
int findbyhash(vector<int>&arr){
    int n=arr.size();
    unordered_set<int>s;
    for(int i=0;i<n;i++){
        if(s.find(arr[i])!= s.end()) return arr[i];
        s.insert(arr[i]);
    }
    return 0;
}

int main(){
   
   vector<int>vec={1,2,3,4,4} ;
   cout<<"duplicate number : "<<findDuplicate(vec);
   return 0;

}