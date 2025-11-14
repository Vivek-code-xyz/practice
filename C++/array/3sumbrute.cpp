#include <iostream>
#include<vector>
#include<set>
#include <algorithm>
using namespace std;

//brute force approch...
vector<vector<int>> sum3(vector<int>arr){
    int n=arr.size();
    set<vector<int>>s;
    
    vector<vector<int>>rans;
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            for(int k=j+1;k<n;k++){
                if(arr[i]+arr[j]+arr[k]==0){
                    vector<int >ans={arr[i],arr[j],arr[k]};

                    sort(ans.begin(),ans.end());
                    if(s.find(ans)==s.end()){
                        s.insert(ans);
                        rans.push_back(ans);
                    }
                }
            }
        }
    }
    return rans;
}

//betterapproch hasing

vector<vector<int>> sum3hash(vector<int>arr){
    int n=arr.size();
    set<vector<int>>s;
    
    vector<vector<int>>rans;
    for(int i=0;i<n;i++){
        int tar=-arr[i];
        set<int>set;
        for(int j=i+1;j<n;j++){
           int third=tar-arr[j];
           if(set.find(third)!=set.end()){
            vector<int>vec={arr[i],arr[j],third};
            sort(vec.begin(),vec.end());
            if(s.find(vec)==s.end()){
                s.insert(vec);
                rans.push_back(vec);
            }
        }
        set.insert(arr[j]);
        }
    }
      return rans;
}

int main(){
    vector<int>vec={-1,0,1,2,-1,4,-2};
    vector<vector<int>>ans=sum3hash(vec);

    for(int i=0;i<ans.size();i++){
        for(int j=0;j<ans.size();j++) cout<<ans[i][j]<<" ";

        cout <<endl;
    }
    return 0;
}
