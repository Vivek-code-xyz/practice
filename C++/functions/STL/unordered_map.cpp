#include <iostream>
#include<unordered_map>
using namespace std;

int main(){
    unordered_map<string,int>map;
    //it stores data randomly 
    //each function has O(1) complexity hense it is better

    map.insert({ "vivek",1014});
    map.emplace("param",309);
    map.emplace("kirtan",714);
    map.emplace("het",502);

    //erase count all are same but ofbO(1) complexity

    for(auto i:map) cout<<i.first<<" "<<i.second<<endl;

    return 0;
}