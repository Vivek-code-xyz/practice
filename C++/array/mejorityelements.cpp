//brute force O(n2)

#include <iostream>
#include <vector>
using namespace std;
int mejor(vector<int>v){
    int n=v.size();
    for(int val:v){
        int count=0;
        for(int j:v){
            if(val==j) {
                count++;
            }
        }
        if(count>n/2) return val;
    }

}

int main(){
    vector<int>vec={2,3,8,5,8,6,8,8,3,3,8,8,8};
    cout<<mejor(vec);
    return 0;
}