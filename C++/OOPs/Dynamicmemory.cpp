#include<iostream>
using namespace std;

class student{
    public:
    string name;
    int age;
    int roll;
    string grade;
};


int main(){

    student *p=new student;  //dynamic memory allocation through pointer on class
    //access it by *(p). or p->

   ( *p).name="tralaleo";
   ( *p).age = 120;

   p->grade="AA";
   p->roll=12;

    cout<<"name of the student is : "<<(*p).name<<endl;
    cout<<"name of the student is : "<<p->name<<endl;

}