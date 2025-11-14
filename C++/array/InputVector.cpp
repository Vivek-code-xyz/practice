#include<iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cout<<"enter no. of subjects:";
    cin>>n;
    vector<int>marks(n);

    cout<<"enter marks of subjects:";
    int val;
    int sum=0;
     for(int i=1;i<=n;i++){
        cin>>val;
        marks.push_back(val);
        sum+=val;
     }
        sum/=n;
     cout<<"percentage obtain = "<<sum;

}
