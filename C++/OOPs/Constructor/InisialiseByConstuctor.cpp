//parametrized constuctor
#include<iostream>
using namespace std;


class costomer{
   
    string name;
    int accNo;
    int balance;
    
    public:
    
    costomer(){//default constructor ... 1st
        accNo=121212;
        balance=1;
        name="fahur";
    }
    costomer(string s,int a,int b){  //parametric constructor  2nd
        name=s;
        accNo=a;
        balance=b;
    }

    //if i make a constructor like this
    costomer(string name){ //3rd
       this-> name=name;  //this can  make errors in code so use (this-> ) pointer 
       accNo=90;
       balance=10;
    }

    costomer(int accNo,int cal){//4th
        name="4th cons";
        this->accNo=accNo;
        balance=cal;
    }

    //this-> points to object created;
    void display(){
        cout<<name<<" "<<accNo<<" "<<balance<<endl;
    }

  
};

int main(){
    //object calls that constuctor whose parameters matches with attributes of constuctors
    costomer A1;                       //calles default constucture
    costomer A2("raghav");            // calls 3rd constructure
    costomer A3("vivek",1222,1000);  //calls 2nd constructure
    costomer A4(12333,1200);       //calls 4th constructor
    A1.display();
    A2.display();
    A3.display();
    A4.display();
}

//Constructor overloading means
//Creating different constructor under same class having different parameters