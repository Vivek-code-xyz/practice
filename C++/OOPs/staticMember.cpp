#include<iostream>
using namespace std;

class student{
    string name;
    int rollNo;
      public:
    static int totalStudent;   //created static date member

 
    student(string a,int b){
        name=a;
        rollNo=b;
        totalStudent ++;    //each formed object increment it by 1
    }

    void display(){
        cout<<name<<" "<<rollNo<<" "<<totalStudent<<endl;
    }

    static void access(){   //static member function
        cout<<totalStudent<<endl;   //to access static member privately
    }

    
};

int student :: totalStudent=0;   //initialise the static member


int main(){
    student a("vivek",155);
    student b("het",101);
    student c("param",125);

    a.display(); //3 stundets
    student :: totalStudent=25;    //access without object  //it is part of class not object
    a.display();  //25 students
    student::access();          //calls static member function....it is function of class not object

    return 0;
}


//Static data members are the attribute of classes declared using static keyword
//Only one copy of that member is created for entire class and it is shared by all the object
//It is initialized after class , by Scope resolution operator (::)