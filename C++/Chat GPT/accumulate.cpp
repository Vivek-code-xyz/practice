#include <iostream>
#include<numeric>
#include<vector>
using namespace std;

int main(){
    vector<int> arr={2,4,6,3,7,8};
    int sum=accumulate(arr.begin(),arr.end(),0);

    cout<<"total sum = "<<sum;
    return 0;
}