#include <iostream>
#include<vector>
using namespace std;

int main(){
    vector<int>vec={ 1,2,3,4,5,6};
    //iterator initiallisation
    vector<int>::iterator it;

    //forward loop
    for(it=vec.begin();it!=vec.end();it++){
        cout<<*(it)<<" ";
    }
    cout<<endl;
    //backword loop
    vector<int>::reverse_iterator itr;
    for(itr=vec.rbegin();itr!=vec.rend();itr++){
        cout<<*(itr)<<" ";
    }
    cout<<endl;
    //we can also use auto keyword... auto keyword assign variable tye auto matically
    for(auto r=vec.begin();r!=vec.end();r++) cout<<*r<<" ";

    return 0;
    
}