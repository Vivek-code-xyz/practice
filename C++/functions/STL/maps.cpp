#include <iostream>
#include<map>
using namespace std;

int main(){
    map<string,int>m;//map has unique key(here string) and corresponding value 
    m["pikachu"]=245;
    m["raichu"]=300;
    m["pichu"]=215; //map stores value lalxicographically
    //means first alphabet stores first ie  a b c d e f g h i j k.....
    m.insert({"bulbasor",240}); //O(logn)
    m.emplace("skquatal",243);      //insert by functions
    m.count("pichu"); //it counts no of elements having key value ==pichu
    m.erase("bulbasor"); //removes elements having key == bulbasor
    //output

    m.find("pikachu"); //--> if found then returns iterator of place.... else return end() iterator

    if(m.find("pichu")!=m.end()) cout<<"found  pichu == "<<m["pichu"];
    else cout<<"element not found";

    for(auto p:m){
        cout<<p.first<<" "<<p.second<<endl;
    }
    //out put individual
    cout<<"pikachu = "<<m["pikachu"]<<endl;



    multimap<string,int>mm;
    //it can store same keys with multiple value;
    //but to access elements we can not use square value.....use only functions

    mm.emplace("vivek",1000);
    mm.emplace("vivek",1230);
    mm.insert({ "param",1020}); //O(logn)
    mm.emplace("kirtan",902); //O(logn)

    cout<<"before erase"<<endl;
    for(auto p:mm){
        cout<<p.first<<" "<<p.second<<endl;
    }
    cout<<"after erase fun"<<endl;
    mm.erase("vivek"); // erase all values with key vivek
    for(auto p:mm){
        cout<<p.first<<" "<<p.second<<endl;
    }

}