#include<iostream>
using namespace std;

class node{    //proper node for linked list
    public:
    int val;
    node *next;

    node(int v){
        val=v;
        next=NULL;
    }
};

int main(){
  
   node *a=new node(10);
   node *b=new node(20);
   node *c=new node(30);
   node *d=new node(40);
   node *e=new node(50);

   a->next=b;       //forming links
   b->next=c;
   c->next=d;
   d->next=e;

   cout<<a->val<<" ";                       //a
   cout<<a->next->val<<" ";                 //b
   cout<<a->next->next->val<<" ";           //c
   cout<<a->next->next->next->val<<" ";     //d
    node *temp=a;
    while(temp!=NULL){
        cout<<temp->val<<" ";
        temp=temp->next;
    }

    return 0;
}