#include <iostream>
using namespace std;
     int sqrt(int x){
        int ans=0;
        int st=1;
        int end=x/2 +1;
        while(st<=end){
            long int mid=st +(end-st)/2;
            if(mid*mid == (long int)x) return mid;
            else if(mid*mid>(long int)x) end=mid-1;
            else{
                ans=mid;
                st=mid+1;
            }
        }
        return ans;
     }
int main(){
    cout<<sqrt(70);
    return 0;

}