#include<iostream>
using namespace std;

class bank{
    string name;
    int balance;
    int accNO;
    static int bankbalance;
    static int totalvisitor;

    public:
    bank(string s,int a,int b){
        name=s;
        balance=a;
        accNO=b;
        bankbalance+=balance;
        totalvisitor++;
    }

    void display(){
        cout<<"name of customer: "<<name<<endl;
        cout<<"Account number: "<<accNO<<endl;
        cout<<"total amount: "<<balance<<endl;
    }

    void diposite(int amount){
        if(amount>0){ 
            this-> balance+=amount;
             bankbalance+=amount;
        }
    }

    void withdraw(int amount){
        if(amount<bankbalance && amount< this->balance){
            this->balance-=amount;
            bankbalance-=amount;
        }
        else cout<<"your bank balance is not enough for the withodrawal"<<endl;
    }

    static void getbankbalance(){
        cout<<"total bank balance till now = "<<bankbalance<<endl;
    }

    static void visitors(){
        cout<<"total visitors visited bank till now = "<<totalvisitor;
    }
};
 
int bank:: bankbalance=0;
int bank:: totalvisitor=0;


int main(){

    bank a1("ravi",1000,1);
    bank a2("raghav",2143,2);
    a1.diposite(230);
    bank a3("vishal",2210,3);
    a2.withdraw(1560);
    a3.diposite(265);
    a1.withdraw(789);

    a1.display();

    bank :: getbankbalance();
    bank:: visitors();

    return 0;

}