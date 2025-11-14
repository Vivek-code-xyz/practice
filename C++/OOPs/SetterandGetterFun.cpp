#include<iostream>
using namespace std;

class vehicle{
    string name;        // by default private
    int speed;
    int tyreNo;
    string type;
    
    //access through functions(methods)
    public:
    void setval(string s,int sp,int ty,string typ){    //value setter function
        name=s;
        speed=sp;
        tyreNo=ty;
        type=typ;
    }
    void setname(string s){
        if(s.length()==0){ 
            cout<<"please enter car name correctly..";
            return;
        }
        name=s;
    }

    //getter functions are use to display(cout) values of private class at main function..

    void display(){    //getter function
        cout<<name<<" "<<speed<<" "<<tyreNo<<" "<<type<<endl;
    }

    void getinfo(int pin){                   //using functionallty for objects
       int p=4892;
        if(pin==p){
            display();
        }
        else{
            cout<<"Enter correct key for informationn ";
            return;
        }
    }
    
};

int main(){

    //to access all the things including functions inside class use . (dot) operator
    vehicle supra;
    supra.setval("supra",320,4,"car");

    supra.display();

    vehicle buggati;
    buggati=supra;
    buggati.setname("buggati");
    buggati.display();

    supra.getinfo(4892);

}