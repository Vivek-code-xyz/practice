#include <iostream>
#include <set>

using namespace std;
int main(){
    set<int>s;
    //it stores data accending order
    //it only sstores unique value
    s.insert(3);
    s.insert(5);
    s.insert(6);
    s.insert(2);
    s.insert(7);

    s.emplace(4);
    s.emplace(3);
    s.emplace(3);

    for(int val: s) cout<<val<<" ";
// other functions are same as maps
    cout<<"\nlower bound : "<<*(s.lower_bound(4))<<endl;//value equal or greater than 4 will be prited
    cout<<"upper bound : "<<*(s.upper_bound(4)); //value  stictly gtrater than 4 will be printed


    //same like maps sets also has multisets and unordered_set  
    return 0;
}