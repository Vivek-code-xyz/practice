 #include<iostream>
 #include<stack>
 #include<queue>
 using namespace std;
    queue<int> reverseK(queue<int>&q,int k){ 
        stack<int>st;
        for(int i=0;i<k;i++){
            st.push(q.front());
            q.pop();
        }
        int n=q.size();
        while(!st.empty()){
            q.push(st.top());
            st.pop();
        }
        
        while(n--){
            q.push(q.front());
            q.pop();
        }
        
        return q;
    }

    int main(){
        queue<int>q;
        q.push(1);
        q.push(2);
        q.push(3);
        q.push(4);
        q.push(5);
        q=reverseK(q,3);

        int n=q.size();
        for(int i=0;i<n;i++){
            cout<<q.front()<<" ";
            q.push(q.front());
            q.pop();
        }

        return 0;

    }