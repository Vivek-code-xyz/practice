#include<iostream>
#include<queue>
using namespace std;

int main(){
    queue<int>q;
    q.push(10);
    q.push(20);
    q.push(30);
    q.push(40);
    cout<<q.back()<<endl; //last in ->40
    cout<<q.front()<<endl;  //first ele-> 10
    q.pop();        //first ele pop
    cout<<q.front()<<endl;  //first after pop->20
    cout<< q.size()<<endl;   //3 ->size of current queue

    cout<<q.empty()<<endl;  //checks if queue is empty(true) or not (false)
    q.emplace(60); //same as push
    cout<<q.back();

    return 0;
}