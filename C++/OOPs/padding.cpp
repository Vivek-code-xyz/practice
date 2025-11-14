#include<iostream>
using namespace std;

//empty class object has size 1;
class emp{

};

class abc{          // due to allignment and easy read for compilers..
                    // the size of class is 8 not 5  (due to pedding by compiler)
    int a;
    char c;
    char d;
    //size == 8  //peding on one side of int a ...total 8
};

class xyz{
    char c;
    int a;
    char b;
    // size == 12  //due to pedding on both side if int a .. total 12
};

//greedy approch 
//define most heavy data structure first then go decreasing  to avoid accessive pedding



int main(){
    emp a;
    cout<<sizeof(a)<<endl;

    abc b;                              //both class abc and xyz have same elements but different size
    cout<<sizeof(b)<<endl;

    xyz c;
    cout<<sizeof(c)<<endl;
    
}
