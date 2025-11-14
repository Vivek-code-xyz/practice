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

void display(node *head){
    node *temp=head;
    while(temp!=NULL){
        cout<<temp->val<<" ";
        temp=temp->next;
    }
    cout<<endl;
    return;
}

int size(node *head){
   
    int n=0;
    while(head!=NULL){
       n++;
        head=head->next;
    }
    cout<<endl;
    return n;
}
//display using recursioon
void displayrec(node *a){
    if(a==NULL) return;
    cout<<a->val<<" ";
    displayrec(a->next);
}

int main(){
  
   node *a=new node(10);
   node *b=new node(20);
   node *c=new node(30);
   node *d=new node(40);
   node *e=new node(50);
   node *f=new node(60);

   a->next=b;       //forming links
   b->next=c;
   c->next=d;
   d->next=e;
   e->next=f;

    displayrec(a);
    cout<<size(a);
   
   
    return 0;
}