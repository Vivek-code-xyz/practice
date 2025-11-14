#include<iostream>
using namespace std;

class node{            //user defined data type
    public:
    int val;
    node*next;

    node(int val){
        this->val=val;
        next=NULL;
    }
};

class linkedlist{        //user defined data structure
    public:
    node*head;
    node*tail;
    int size;
    linkedlist(){
        head=tail=NULL;
        size=0;
    }

    void pushback(int val){  //insert at tail
        node*temp=new node(val);
        if(size==0){
            head=temp;
            tail=temp;
        }
        else{
            tail->next=temp;
            tail=temp;
        }
        size++;
        
    }

    void pushfront(int val){    //insert at head
        node *temp=new node(val);
        if(size==0){
            head=tail=temp;
        }
        else{ 
            temp->next=head;
            head=temp;
        }
        size++;
    }

    void insertAt(int idx,int val){       //insert at any index
        if(idx<0 || idx > size) {
            cout<<"Invalid index..";
        }
        else if(idx==0) return pushfront(val);
        else if(idx==size) return pushback(val);
        else{
            node *t = new node(val);
            node *temp=head;
            for(int i=1;i<=idx-1;i++){
                temp=temp->next;
            }
            t->next=temp->next;
            temp->next=t;
            size ++;
            return;
        }
    }

    void display(){           //display the linked list
        node *temp=head;
        while(temp!=NULL){
            cout<<temp->val<<" ";
            temp=temp->next;
        }
        cout<<endl;
      
    }
    

    int getAtIdx(int idx){          //get value at any index
        if(idx<0 || idx>=size) {
            cout<<"invalid index..";
            return -1;
        }
        else if(idx==0) return head->val;
        else if(idx==size-1) return tail->val;
        else{
            node *temp=head;
            for(int i=1;i<=idx;i++){
                temp = temp->next;
            }
            return temp->val;
        }
    }

    void popfront(){       //delete at head
        if(size==0){
            cout<<"linked list is already empty...";
            return;
        }
        else{
            head=head->next;
            size--;
        }
    }

    void popback(){          //delete at tail
        if(size==0){
            cout<<"linked list is already empty...";
            return;
        }
        node *temp=head;
        for(int i=1;i<size-1;i++){
            temp= temp->next;
        }
        temp->next=NULL;
        tail=temp;
        size--;
    }
    void popAt(int idx){         //delete at any idx
        if(idx<0||idx>=size){
            cout<<"Invalid index... ";
            return;
        }
        else if(idx==0) return popfront();
        else if(idx==size-1) return popback();
        else{ 
            node *t=head;
            for(int i=1;i<idx;i++){
                t=t->next;
            }
            t->next = t->next->next;
            size--;
            return;
        }
    }

};

int main(){
    linkedlist ll;
    ll.pushback(50);
    ll.pushback(100);
    ll.pushback(150);
    ll.display();
    ll.pushfront(10);
    ll.display();
    ll.insertAt(2,55);
    ll.popback();
   
    ll.pushfront(45);
    ll.pushfront(125);
    ll.pushfront(1455);
    ll.popAt(3);
    ll.insertAt(0,300);
    ll.display();
    return 0;
}