#include<iostream>

using namespace std;

class student{        //student is class and s1,s2 are called as objects
    //access modifieres
    // private:
    // protected:
    public:
    string name;
    int age,rollno;
    string grade;
};

int main(){
    student s1;
    s1.name="vivek";
    s1.age=17;
    s1.rollno=155;
    s1.grade="AA";

    cout<<s1.name<<endl;

    student s2;     //copy one object from another 
    s2=s1;
    cout<<s2.age<<endl;

    return 0;
}