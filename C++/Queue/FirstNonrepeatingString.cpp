#include<iostream>
#include<queue>
#include<string>
#include<vector>
using namespace std;

int main(){
    string st="aabbccddee";
    string ans="";
    vector<int>mapper(26,0);
    queue<char>q;

    for(int i=0;i<st.length();i++){
        if(mapper[st[i]-'a']>=1){     //for repeating element encounter
            mapper[st[i]-'a']++;
            // while(!q.empty() && mapper[q.front()-'a']>1){
            //     q.pop();
            // }
            // ans+= (q.empty())?'#':q.front();
        }
        else{    //for not repeated elements

            mapper[st[i]-'a']++;
            q.push(st[i]);
            //  while( mapper[q.front()-'a']>1){
            //     q.pop();
            // }
            // ans+= q.front();
        }
         while(!q.empty() && mapper[q.front()-'a']>1){
                q.pop();
            }
            ans+= (q.empty())?'#':q.front();
    }

    cout<<ans;
}