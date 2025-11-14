#include <iostream>
#include <vector>
using namespace std;


  int main(){
    //we can use pair to store two different data types under same variable
    pair<int,char>p={2,'A'};
    //accessing
    cout<<p.first<<" "; //2
    cout<<p.second<<" "<<endl; //A

    //nesting of pairs
    pair<int,pair<char,double>>pr={3,{'a',1.638}};
    cout<<pr.first<<" \n"; //3
    cout<<pr.second.first<<" ";//a
    cout<<pr.second.second<<" \n";//1.638
    
    cout<<"pairs i vectors : \n";
    //pairs in vectors
    vector<pair<int,int>>vec={{1,2},{3,4},{5,6}};

    vec.push_back({4,9});
    vec.emplace_back(5,6); //creates in place objects
    //in emplace back we dont have to specify argument as a pair
    for(auto i : vec){
        cout<<i.first<<" "<<i.second<<endl ;
       }

       
    
  return 0;
  }