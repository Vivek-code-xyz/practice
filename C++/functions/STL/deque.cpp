#include <iostream>
#include<deque>
using namespace std;
int main(){

deque<int> d={1,2,3,4,5}; //it is nothing but double ended que

d.push_back(5); //insert 5 from ending
d.push_front(3); //insert 2 from starting
d.pop_back();
d.pop_front(); //remove ele from starting

//all the functions of vectors are ideally apppllied to list...ie iterators,insert,erase  etc

for(int i : d) cout<<i<<" ";
 
//since deque is made up of dynamic array...it has index system
 
cout<<d[2]<<" "; //prints ele at 2 nd idx
return 0;
}