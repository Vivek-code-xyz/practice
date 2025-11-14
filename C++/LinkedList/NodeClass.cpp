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
    node a(10);
    node b(20);
    node c(30);
    node d(40);

    a.next= &b;
    b.next= &c;
    c.next= &d;     //linked list formed;

    cout<<a.val<<" ";
  //  cout<< (*(a.next)).val<<endl;   b ki value using a
    cout<<(a.next)->val<<" ";   //value of b using a and arrow

    //printing c
    cout<<( ( a.next)->next)->val<<" ";
    
    //printing d
    cout<<  (( (a.next)->next)->next)->val<<" ";
    cout<<"\nprinting by loop...........\n";
    node temp=a; 

    
    while(&temp !=NULL){ 
        cout<<temp.val<<" ";
        // if(temp.next==NULL) break;
        temp = *(temp.next); 
    }

    return 0;
}