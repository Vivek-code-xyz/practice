#include<iostream>
#include<cmath>
using namespace std;


        bool judgeSquareSum(int c) {
            long long st=0;
            long long end=sqrt(c);
            while(st<=end){
                if((st*st + end*end)==c) return true;
                else if((st*st + end*end)>c) end--;
                else st++;
            }
            return false;
        }
    
int main(){
    int n=25;
    cout<<judgeSquareSum(n);
    return 0;
}