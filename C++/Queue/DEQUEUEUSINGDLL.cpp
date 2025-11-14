#include<iostream>
using namespace std;

class node{
    public:
    node* next;
    node* prev;
    int val;
    node(int x){
    next=prev=NULL;
        val=x;
    }
};

class Deque{
    node* front;
    node*back;
    int s; //for size
   
    public:
   
    Deque(){
        front=back=NULL;
        s=0;
    }
   
    void pushfront(int x){
        if(front==nullptr){
            front = back =new node(x);
        }
        else{
            node* temp=new node(x);
            temp->next=front;
            front->prev=temp;
            front = temp;

        }
        s++;
    }
   
    void pushback(int x){
        if(front==nullptr){
            front =back= new node(x);
        }
        else {
            node * temp=new node(x);
            back->next=temp;
            temp->prev=back;
            back=temp;
        }
        s++;
    }

    void popfront(){
        if(s==0){
            cout<<"Your Dequeue is empty!"<<endl;
            return;
        }
        else if(s==1){
            node *temp= front;
            front=back=nullptr;
            delete(temp);
        }
        else{
            node*temp=front;
            front=front->next;
            delete(temp);
            front->prev=NULL;
        }
        s--;
    }

    void popback(){
        if(s==0){
            cout<<"Your Dequeue is empty!"<<endl;
            return;
        }
        else if(s==1){
            node *temp= back;
            front=back=nullptr;
            delete(temp);
        }
        else{
            node*temp=back;
            back=back->prev;
            delete(temp);
            back->next=NULL;
        }
        s--;
    }

    int size(){
        return s;
    }
   
    bool empty(){
        if(s==0) return true;
        return false;
    }

    int first(){
        return front->val;
    }
   
    int last(){
        return back->val;
    }

    void display(){
        node*temp=front;
        while(temp){
            cout<<temp->val<<" ";
            temp=temp->next;
        }
        cout<<endl;
    }
};


int main(){
    Deque s;
    s.pushback(8);
    s.pushback(9);
    s.pushback(10);
    s.pushfront(1);
    s.pushfront(2);
    s.pushfront(3);
    s.display();
    s.popback();
    s.popfront();
    s.display();
}