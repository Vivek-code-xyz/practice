//bishup moves from (x,y)

#include<iostream>
#include<algorithm>
using namespace std;

int main(){
    int a,b;
    cout<<"enter coordinates of bishop moves : ";
    cin>>a>>b;
    int totalmove=0;
    totalmove+=min(8-a,8-b);
    totalmove+=min(8-a,b-1);
    totalmove+=min(a-1,8-b);
    totalmove+=min(a-1,b-1);

    cout<<"total moves bishup can take = "<<totalmove;
    return 0;
    
}
