#include<iostream>
using namespace std;
//multilevel inheritance;
class person{
    protected:
    string name;

    public:
    void intro(){
        cout<<"my name is "<<name;
    }
};
class employee : public person {  //all inharitnant things are in protected..

    protected:
    int sallary;

    public:
    void gain(){
        cout<<"MY monthly salary is :"<<sallary;
    }
};

class manager : public employee{
   protected:
    string department;

    public:

    manager(string n,int s,string d){
        name =n ;
        sallary=s;
        department=d;

    }

    void display(){
        cout<<name<<endl;
        cout<<sallary<<endl;
        cout<<department<<endl;
    }

};

int main(){
    manager a1("vivek",50000,"huminities");
    a1.display();
}