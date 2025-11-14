#include<iostream>
using namespace std;

class Queue{
    int f;
    int b;
  
    int arr[15];
    int n=sizeof(arr)/sizeof(arr[0]);

    public:

    Queue(){
        f=0;
        b=0;
    }

    void push(int x){
        if(b==n){
            cout<<"Queue overflow"<<endl;
            return;
        }
        arr[b]=x;
        b++;
    }

    void pop(){
        if(f==b){
            cout<<"Queue is empty"<<endl;
            return;
        }
        f++;
    }
    int front(){
        if(f==b){
            cout<<"Queue is empty"<<endl;
            return -1;
        }
        return arr[f];
    }

    int back(){
        if(f==b){
            cout<<"Queue is empty"<<endl;
            return -1;
        }
        return arr[b-1];
    }

    int size(){
        return b-f;
    }
    bool empty(){
        if(b==f) return true;
        return false;
    }

    void display(){
       

        for(int i=f;i<b;i++){
            cout<<arr[i]<<" ";
        }
        cout<<endl;
        return;
    }


};

int main(){
     
    Queue q;
    q.push(10);
    q.push(20);
    q.pop();
    q.push(30);
    q.push(40);
    q.pop();
    q.push(50);
    q.push(60);
    q.push(70);
    q.pop();
    q.push(80);
    q.push(90);
    q.pop();
    q.push(100);
    q.push(110);
    q.display();
    q.pop();
    q.display();
    cout<<q.front()<<" "<<q.back()<<endl;
    cout<<q.empty()<<endl;
    cout<<q.size();
}