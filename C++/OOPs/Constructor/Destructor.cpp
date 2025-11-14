#include<iostream>
using namespace std;

//Destructor is the last function automatically called before object is going to destroy;
//It releases or destroys dynamically allocated resources to the object
//like memory in the heap

class custom{
    string name;
    int *balance;

    public:
    custom(){
            //default
            name="4";
            cout<<"constructor for "<<name<<endl;

    }

    custom(string name){    //constructor
        this-> name=name;
        balance=new int;  //takes memory from the heap
        *balance = 100;         // stores bal into that memory by dereference

        cout<<"costructor is called for "<<name<<endl;
    }
    //Destructor releasesthe dynamically allocated memory ie balancepointer
    //it has no return type or parameter and called only once

    ~custom(){            // this is default destructor which compiler creates internally
        delete balance;
        cout<<"destructor is called for "<<name<<endl;
    }
};
int main(){

    custom A("1"),B("2"),C("3");    //Constructor is called orderwise while destructor is called in reverse order

    //creating dynamic object

    custom *p=new custom; //name =4 by default
    //destructor is not called for this...
    //to call it write as below..

    delete p;

}