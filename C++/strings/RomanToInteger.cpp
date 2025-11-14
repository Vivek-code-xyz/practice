#include<iostream>
#include<string>
using namespace std;

  int num(char c){
        switch(c){
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default : return 0;
        }
    }
    int romanToInt(string s) {
        int n=s.length();
        int i=0,sum=0;
        while(i<n-1){
            if(num(s[i])<num(s[i+1])) sum-=num(s[i]);
            else sum+=num(s[i]);
            i++;
        }
        sum+=num(s[n-1]);

        return sum;
    }

int main(){
    string s;
    cout<<"Enter roman number : ";
    getline(cin,s);

    cout<<"integer value is : "<<romanToInt(s);
    return 0;
}