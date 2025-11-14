#include<iostream>
#include<vector>
#include<queue>
#include<algorithm>
using namespace std;

    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        int n=deck.size();
        queue<int>q;
        for(int i=0;i<n;i++){
            q.push(i);
        }
        sort(deck.begin(),deck.end());
        vector<int>ans(n);
        int i=0;
        while(q.size()>0){
            ans[q.front()]=deck[i];
            q.pop();
            q.push(q.front());
            q.pop();
            i++;
        }

        return ans;
    }

int main(){
    vector<int>deck={17,13,11,2,3,5,7};
    vector<int>ans=deckRevealedIncreasing(deck);

    for(int i:ans){
        cout<<i<<" ";
    }
    cout<<endl;
    return 0;
}