#include<iostream>
using namespace std;

class movie{
    string name;
    string hero;
    int year;    ///release year

    public:

    movie(){

    }
    movie(string s,string str,int a){
        name=s;
        hero=str;
        year=a;
    }

    movie(movie &A){   //my custom copy constructor...  & is necessary
        name=A.name;
        hero=A.hero;
        year=A.year;
    }

    //getter
    void display(){
        cout<<name<<" "<<hero<<" "<<year<<endl;
    }
};

int main(){
    movie avengers("endgame","RDJ",2019);

    movie marvel(avengers);  //default copy by compiler's copyconstructor 

    marvel.display();

    movie DC;           //i have to create default constructor for this...
    DC=marvel;

    DC.display();


}