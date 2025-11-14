#include <iostream>
#include <vector>
using namespace std;
int peakidx(vector<int>vec){
    int st=1,end=vec.size()-2;
    while(st<=end){
        int mid= st+(end-st)/2;
        if(vec[mid]>vec[mid-1] && vec[mid]>vec[mid+1]) return mid;
        else if(vec[mid]>vec[mid-1]) st=mid+1;
        else  end=mid-1;
    }
    return -1;
}

int main(){
    vector<int>vec={1,33,45,67,456,444,345,23,12,2};
    cout<< peakidx(vec);
    return 0;
}