#include <iostream>
#include<stack>

using namespace std;

int main(){
    stack<int>s;//stack is last in first out datastructure
    s.push(4);
    s.push(5);
    s.push(6);
    s.emplace(8); // s=4,5,6,8
    s.pop(); // it removes last element added ie 8 --> s=4 5 6
    s.size(); // prints no of elments in stack  == 3
    s.empty(); //checks if stack is empty or not
    s.top();//prits newest element added in stack

    stack<int>s2;

    swap(s2,s); // elements transfered to s2 and s1 is empty
    cout<<s.empty()<<endl;//1 true
    cout<<s2.empty()<<endl;//0 false
    //to print elements of stack we have to use while loop+above functions
    //  stack print in reverse order....
    while(!s2.empty()){ // jab tak s2 empty na ho tab tak
        cout<<s2.top()<<" ";
        s2.pop(); // remove top element
    }

    return 0;
}