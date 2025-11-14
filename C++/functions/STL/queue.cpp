#include<iostream>
#include<queue>
using namespace std;

int main(){
    queue<int>q; //first in first out

    q.push(4);
    q.push(5);
    q.push(7);
    q.push(8);
    q.emplace(9);

    q.front();//prints first value of queue
    q.pop(); //removes first value of queue not last --> q== 5 7 8 9

    q.empty(); //same like stack
    q.size(); //prints size

    queue<int>q2;
    swap(q2,q); //swaps the q into q2 hence q is empty now

    //print using function  forward printing
    while(!q2.empty()){
        cout<<q2.front()<<" ";
        q2.pop();
    }
    return 0;
}