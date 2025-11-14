#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector<int> vec = {1, 2, 3, 4, 5, 6};

    vec.push_back(4);    // adds 4 on last --> 1,2,3,4,5,6,4
    vec.emplace_back(7); // same like push back-->1,2,3,4,5,6,4,7
    vec.pop_back();      // removes ele from the last -> 1,2,3,4,5,6,4
    vec.size();          // print no. of ele of vector --> 7
    vec.capacity();      // print how many no. can be hold by current vector --> 12
    vec.front();         // print first element -->  1
    vec.back();          // --> prints last ele --> 4
    vec.at(4);         // prints ele at index 4 --> 5  can also use vec[4];
     
    // vec.begin(); is an iterator of index 0 
    // vec.end(); is an iterator of idex n note..it does not point on last element..it points on last idx+1 
    vec.erase(vec.begin(),vec.begin()+3);//erase elements from idx 0 to 3 excluding idx 3 --> erase 1 2 3
    vec.erase(vec.begin()+2); // erase element of idx 2  ie {4,5,6,4} -->  {4,5,4}
    vec.insert(vec.begin()+2,10); //insert val 10 on idx 2 -->{4,5,10,4}
    vec.clear(); // clear all the values of vector but capacity of vector remains same -->    
    vec.empty(); // checks if vector empty then return 1 else return 0;

    *(vec.begin());// prints value at idx 0 i.e. 4
    *(vec.end());//print next value of last idx  i.e garbage value


}