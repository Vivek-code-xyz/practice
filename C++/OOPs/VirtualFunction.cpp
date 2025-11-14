#include<iostream>
using namespace std;
//IMP  Pointer of parent class can store  addressof child classes in HEAP
class animal{
    public:
    virtual void speak(){
        cout<<"huhuhu\n";
    }
};
class dog : public animal{
    public:
    void speak(){
        cout<<"bhau bhau\n";
    }

    void roti(){
        cout<<"give me roti";
    }
};

int main(){
  animal *p;
  p=new dog;   //allocate at runtime 
  p->speak();  //so function calls animal type not dog because dog exist at runtime but function calls at compile time
    //to prevant this add virtual keyword at function of animal so it can execute at run time

//p->roti();  //can not access because p is animal type...can access functions which are defined in it having same name
}

// virtual keyword told compiler to execute perticular function in runtime 
//instead of compile time







//PURE VIRTUAL FUNCTION ;
// it means as  ----->><>>>>  virtual void abc()=0;
//also known as abstract class;
//you can not create objects of that class in which pure virtual function is defined or present;