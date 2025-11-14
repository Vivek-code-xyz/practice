#include<iostream>
#include<queue>
#include<vector>
using namespace std;

    int countStudents(vector<int>& students, vector<int>& launch) {
        queue<int>q;
        for(int i=0;i<students.size();i++){
            q.push(students[i]);
        }

        int count =0;
        int i=0;
        while(!q.empty() && count<q.size()){
            if(q.front()==launch[i]){
                i++;
                q.pop();
                count=0;
            }
            else{
                count++;
                q.push(q.front());
                q.pop();
            }
        }
        return q.size();
    }

    int main(){
        vector<int>stu={1,0,0,1,0,1,1};
        vector<int>sandwitch={0,0,1,0,1,0,0,1};
        cout<<countStudents(stu,sandwitch);
    }