#include <iostream>
#include <vector>
using namespace std;
int main(){
   vector<int>vac={3,4,2,56,3,2,56};
   int sum=0;
   for(int i:vac){
     sum^=i;
   }
   cout<<"unique element:"<<sum;
   return 0;
}