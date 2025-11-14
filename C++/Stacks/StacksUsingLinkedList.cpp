#include<iostream>
using namespace std;

class node{
    public:
    int val;
    node *next;
   
    node(int val){
        this->val=val;
        this->next=NULL;

    }
};

class stack{
    public:
    node* head;
    int size;
    stack(){
        head=NULL;
        size=0;
    }
    void push(int val){
        node *t=new node(val);
        t->next=head;
        head=t;
        size++;
    }
    void pop(){
        if(head==NULL){
            cout<<"stack is empty..";
            return;
        }
        head=head->next;
        size--;
        return;
    }
    int top(){
         if(head==NULL){
            cout<<"stack is empty..";
            return -1;
        }
        return head->val;
        cout<<endl;
    }

    int sizeofstack(){
        return size;
    }

    void display(){
        node*temp=head;
        while(temp){
            cout<<temp->val<<" ";
            temp=temp->next;
        }
        cout<<endl;
    }

};


int main(){
stack st;
    st.push(60);
    st.push(65);
    st.push(67);
    st.push(69);
    st.pop();
    st.display();
    cout<<st.top();
    return 0;
}