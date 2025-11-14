#include<iostream>
#include<vector>
using namespace std;

int main(){
    vector<int>lal={1,2,3,4};
    lal.push_back(45);
  cout<< lal.capacity()<<endl;
  cout<< lal.size()<<endl;
 
    for(int i=0;i<lal.size();i++){
        cout<<lal.at(i)<<" ";
       
    }
}