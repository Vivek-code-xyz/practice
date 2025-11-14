#include<iostream>
using namespace std;
//  MULTIPLE INHARITANCE :  Multiple parent class but single child class
class coder{
    protected :
    string language;

    public:
    void dsa(){
        cout<<"I do DSA in "<<language<<endl;
    }
};

class gamer{
    protected:
    string game;

    public:
    void gam(){
        cout<<"MY favorite game is "<<game<<endl;
    }
};

class person : public coder,public gamer{
    protected:
    string name;
    public:
    person(string n,string g,string l){
        name=n;
        game=g;
        language=l;
    }

    void display(){
        cout<<"my name is : "<<name<<endl;
        dsa();
        gam();

    }
};

int main(){
    person A1("vivek","freefire","C++");
    A1.display();
    A1.dsa();
    A1.gam();
}