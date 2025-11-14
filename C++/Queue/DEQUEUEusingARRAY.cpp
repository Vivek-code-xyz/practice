#include<iostream>
using namespace std;

class Deque{
    int front;
    int rear;
    int s;
    int *arr;
    public:
    Deque(int n){
        front=rear=-1;
        s=0;
        arr=new int[n];
    }

    bool isempty(){
        return(front==-1);
    }
    bool isfull(){
        return( (rear+1)%s == front) ;
    }

    void pushfront(int x){
        if(isempty()){
            front = rear=0;
            arr[0]=x;
        }
        else if(isfull()){
            cout<<"Deque overflow!"<<endl;
            return;
        }
        else{
            front = (front-1+s)%s;
            arr[front]=x;
        }
    }

    void pushback(int x){
         if(isempty()){
            front = rear=0;
            arr[0]=x;
        }
        else if(isfull()){
            cout<<"Deque overflow!"<<endl;
            return;
        }
        else{
           rear=(rear+1)%s;
           arr[rear]=x;
        }
    }

    void popfront(){
        if(isempty()){
            cout<<"DEque is empty!"<<endl;
            return;
        }
        else if(front=rear){
            front=rear=-1;
            return;
        }
        else{
            front=(front+1)%s;
        }
    }

    void popback(){
        if(isempty()){
            cout<<"Deque is empty!"<<endl;
            return;
        }
        else if(front=rear){
            front=rear=-1;
            return;
        }
        else{
            rear=(rear-1+s)%s;
        }
    }

    int start(){
        if(isempty()) return -1;
        return arr[front];
    }
    int end(){
        if(isempty()) return -1;
        return arr[rear];
    }
};
int main(){

}