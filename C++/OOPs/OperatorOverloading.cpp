#include <iostream>
using namespace std;

class complex{
    int real,img;

    public:
    complex(int a,int b){
        real=a;
        img=b;
    }
    complex(){  //default constructor

    }

    void display(){
        cout<<real<<" + i"<<img<<endl;
    }

    //operator overloading
    complex operator +(complex &c){
        complex ans;  //needs default constructor
        ans.real=real+c.real;
        ans.img=img+c.img;
        return ans;
    }
};
int main(){

    complex c1(2,4);
    complex c2(3,5);
    complex c3=c1+c2;  //same as c1.+(c2)   + is operator function
    c3.display();
}