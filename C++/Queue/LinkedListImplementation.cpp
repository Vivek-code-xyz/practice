#include<iostream>
using namespace std;

class node{
    public:
    int val;
    node *next;

    node(int val){
        this->val=val;
        next=NULL;
    }
};

class Queue{
    int size;
    node *head;
    node *tail;
    public:
    Queue(){
        size=0;
        head=tail=NULL;
    }

    void push(int x){
        node*temp= new node(x);
        if(size==0){
            head=tail=temp;
            size++;
            return;
        }
        
        tail->next=temp;
        tail=temp;
        size++;
        
    }

    void pop(){
        if(size==0){
            cout<<"Queue is empty";
            return;
        }
        node*temp=head;
        head=head->next;
        size--;
        delete(temp);
    }
    
    int front(){
        if(size==0){
            cout<<"Queue is empty";
            return -1;
        }
        return head->val;
    }

    int back(){
        if(size==0){
            cout<<"Queue is empty";
            return -1;
        }
        return tail->val;
    }
    int length(){
        return size;
    }


    void display(){
        node *temp=head;
        while(temp){
            cout<<temp->val<<" ";
            temp=temp->next;
        }
        cout<<endl;
    }

    bool empty(){
        if(size==0) return true;
        return false;
    }
};


int main(){
    Queue q;
    q.push(40);
    q.push(30);
    q.push(20);
    q.push(10);
    q.display();
    cout<<q.length()<<endl;
    q.pop();
    cout<<q.length();
    q.display();
}