#include<iostream>
using namespace std;
//constructor  Is a special type of function that is called automatically when the object is created
//It has no return type and have name of class

class costomer{
    public:
    string name;
    int accNo;
    int balance;

    costomer(){ //this is default constructor which compiler adds autometically and calls when object is created
        //if i do some work.it will autometically executed when an object is formed;
        cout<<"this is defalut constructor...";
    }

};

int main(){
    costomer A1;

}