#include<iostream>
using namespace std;

class student{
    string name;
    int rollNo;
    int age;
    int *resource;
    public:
    inline student(string a,int b,int c):name(a),rollNo(b),age(c){
        //inline constructor..
        resource = new int[100];  //provide heap to object by any constructor 
    }
    void display(){
        cout<<name<<" "<<rollNo<<" "<<age<<endl;
    }

};

int main(){
    student one("vivek",25,17);

    one.display();
}