#include<iostream>
#include<stack>
using namespace std;

void printstack(stack<int>s){
    stack<int>temp;
    while(!s.empty()){
        temp.push(s.top());
        s.pop();
    }
    while(temp.size()!=0){
        cout<<temp.top()<<" ";
        s.push(temp.top());
        temp.pop();
    }
    cout<<endl;
    return ;
}

int main(){
    stack<int>st;
    st.push(10);
    st.push(20);
    st.push(30);
    st.push(40);
    st.push(50);

   printstack(st);

   //reversing the same stack by using stacks only
   stack<int>gt;
   stack<int>rt;

   while(!st.empty()){        //stack is reversed
        gt.push(st.top());
        st.pop();
    }

    while(!gt.empty()){      // reversed again (oringnal)
        rt.push(gt.top());
        gt.pop();
    }

    while(!rt.empty()){       // reverse final...in same stack
        st.push(rt.top());
        rt.pop();
    }
    printstack(st);
    return 0;
}