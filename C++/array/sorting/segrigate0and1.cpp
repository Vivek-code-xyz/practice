#include <iostream>
#include <vector>


using namespace std;

void segrigate(vector<int>v){
    int st=0,end=v.size()-1;
    while(st<=end){
        if(v[st]==0) st++;
       else if(v[end]==1) end--;
        else {
            swap(v[st],v[end]);
            st++;
            end--;
        }
    }
    for(int i:v) cout<<i<<" ";

    return ;

}
int main(){
    int n;
    cout<<"enter size of array : ";
    cin>>n;
    vector<int>vec(n);
    cout<<"enter elements of vector from 0 and 1 : ";
    for(int i=0;i<n;i++){
        cin>>vec[i];
    }
    segrigate(vec);
    return 0;
    
}