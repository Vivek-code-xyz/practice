#include<iostream>
using namespace std;

class human{
    protected:
    string name;
    int age;

    public:
    void work(){
        cout<<"I am working\n";
    }

    human(){
        cout<<"constructor of human is called\n";
    }

    human(string n,int a){
        name=n;
        age=a;
    }
    ~human(){
        cout<<"distructor of human is called\n";
    }
    void display(){
        cout<<name<<age;
    }
};

class student : public human{
    int rollNO,fees;

    public:
    student (string n,int a,int r,int f) : human(n,a){         //calling constructor of parent as written
        
        rollNO=r;
        fees=f;

    }
    student(){
        cout<<"constructor of  student is called"<<endl;
    }
    ~student(){
        cout<<"distructor of  student is called\n";
    }

    void display(){
        cout<<name<<" "<<age<<" "<<rollNO<<" "<<fees<<endl;
    }
};

int main(){
    student A1("vivek",17,27,100);

    A1.work();     //can access function of inharit class due to public access
    A1.display();   //first prference is child class than parent class
}