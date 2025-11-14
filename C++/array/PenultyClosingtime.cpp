#include<iostream>
#include<vector>
using namespace std;

int bestClosingTime(string customers) {
    int n=customers.length();
  vector<int>pre(n+1);
  vector<int>suf(n+1);
    pre[0]=0;
    for(int i=0;i<n;i++){
        pre[i+1] = pre[i]+( customers[i]=='N'? 1 : 0);
    }
    suf[n]=0;
    for(int i=n-1;i>=0;i--){
        suf[i]=suf[i+1] + (customers[i]=='Y'?1 :0);
    }
    int idx=-1,minpen=n;
    for(int i=0;i<=n;i++){
        pre[i]+=suf[i];
        if(pre[i]<minpen){
            idx=i;
            minpen=pre[i];
        }
    }

    return idx;
}

int main() {
    string customers;
    cout << "Enter the customer string (e.g., YNNYNY): ";
    cin >> customers;

    int bestTime = bestClosingTime(customers);

    cout << "Best closing time index: " << bestTime << endl;

    return 0;
}
