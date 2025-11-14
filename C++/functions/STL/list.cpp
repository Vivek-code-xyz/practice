#include <iostream>
#include<list>
using namespace std;
int main(){

list<int> l={1,2,3,4,5}; //it is nothing but doublly ended linklist

l.push_back(5); //insert 5 from ending
l.push_front(3); //insert 2 from starting
l.pop_back();
l.pop_front(); //remove ele from starting

//all the functions of vectors are ideally apppllied to list...ie iterators,insert,erase  etc

for(int i : l) cout<<i<<" ";
 
//you cannot accese elements as l[2]... you can use iterators or rangebaseed loop like
 auto it=next(l.begin(),2); //moves iterator to 2 steps
cout<<*(it);
 

return 0;
}