#include<iostream>
using namespace std;
//HIERARCHICAL INHARITANCE : single parent class but multiple child classes

class human{
    protected:
    string gender;
    int age;

    public:
    human(){

    }
    
    human(string n,int a){
        gender=n;
        age=a;
    }
  
    void display(){
        cout<<gender<<age;
    }
};

class person: public human{
    protected:
    string name;

    public:
    person(string name,string gender,int age){
        this->name=name;
        this->gender=gender;
        this->age=age;
    }
    void intro(){
        cout<<"my name is "<<name;
    }
};

class teacher : public human{
    protected:
    string subject;

    public:
     teacher(string sub,string gender,int age){
        this->subject=sub;
        this->gender=gender;
        this->age=age;
    }


};
int main() {
    person p("Alice", "Female", 25);
    p.intro();
    p.display();

    teacher t("Math", "Male", 40);
   
    t.display();

    return 0;
}
