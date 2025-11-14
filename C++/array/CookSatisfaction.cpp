#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int maxSatisfaction(vector<int>& satisfaction) {
    int n=satisfaction.size();
    sort(satisfaction.begin(),satisfaction.end());
    vector<int>suff(n);
    suff[n-1]=satisfaction[n-1];
    for(int i=n-2;i>=0;i--){
        suff[i]=suff[i+1] + satisfaction[i];
    }

    int idx=-1;
    for(int i=0;i<n;i++){
        if(suff[i]>=0) 
      {  idx=i;
        break;}
    }

    if(idx==-1) return 0;
    int maxsum=0;
    int mlt=1;
    for(int i=idx;i<n;i++){
        maxsum+= (satisfaction[i]*mlt);
        mlt++;
    }

    return maxsum;
}

int main() {
    int n;
    cout << "Enter number of dishes: ";
    cin >> n;

    vector<int> satisfaction(n);
    cout << "Enter satisfaction levels: ";
    for (int i = 0; i < n; i++) {
        cin >> satisfaction[i];
    }

    int result = maxSatisfaction(satisfaction);

    cout << "Maximum total Like-time coefficient: " << result << endl;

    return 0;
}
