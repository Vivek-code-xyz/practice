#include<iostream>
#include<queue>
using namespace std;

int main(){
   priority_queue<int>q; //it is just like queue
   //it stores elements with highest priority on top of the queue 
   //by defoult it stores integers in accending order because biggest value at top

   q.push(5);
   q.push(7);
   q.emplace(9);
   q.push(4);
    q.push(8);

    q.top();//prints first value of queue it not have front function
    q.pop(); //removes top value ie  bigest value --> 9 is removed

    q.empty(); //same like stack
    q.size(); //prints size

   

    //print using function decreasing printing
    while(!q.empty()){
        cout<<q.top()<<" ";
        q.pop();
    }
    cout<<endl;

    //to print in reverse order we use functors(function objects)
    priority_queue<int,vector<int>,greater<int>>q2;
    q2.push(4);
    q2.push(13);
    q2.push(1);
    q2.emplace(6);
    q2.emplace(9);
    while(!q2.empty()){
        cout<<q2.top()<<" ";
        q2.pop();
    }
    
    return 0;
}