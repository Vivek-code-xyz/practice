#include<iostream>
using namespace std;

class human{       //parent class
    private:
   string gender;  //can not access in child class
  
 protected:

    string name;        //can be aaccess
    int age,weight;

};
                                                                        
class student : protected human{           //child class                    
   
   private:
    int rollNo;
    int fees;

    public:
    void fun(string n){
        name=n;                    //protected and public can be access in child class
    }

    void display(){
        cout<<"you enter : "<<name;
    }
};

int main(){
    student a;
    a.fun("vivek");
    a.display();
    
}



//private >> protected >> public

//private :  only accesssible inside class
//public :  accessible in main function as well as in child class
//potected : accessible in child class but not in main