#include<iostream>
#include<algorithm>
#include<vector>
#include<stack>
using namespace std;

class TreeNode{
    public: 
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x){
        val=x;
        left=nullptr;
        right=nullptr;
    }

  
};

vector<int> pretraversal(TreeNode *root){   //pre  NLR
    vector<int>ans;
    stack<TreeNode*>st;
    st.push(root);
    while(st.size()){
        TreeNode*temp=st.top();
        st.pop();
        ans.push_back(temp->val);

        if(temp->right) st.push(temp->right);
        if(temp->left) st.push(temp->left);
    }
    return ans;
}

vector<int> intraversal(TreeNode *root){  // in LNR
    vector<int>ans;
    stack<TreeNode*>st;
    stack<int>fill;
    st.push(root);
    fill.push(0);
    while(st.size()){
        TreeNode*temp=st.top();
        st.pop();
        int x=fill.top();
        fill.pop();
        
       
        if(x==1){ 
            ans.push_back(temp->val);
        }
        else{
            if(temp->right){ 
                st.push(temp->right);
                fill.push(0);
            }

            st.push(temp);
            fill.push(1);

            if(temp->left) {
                st.push(temp->left);
                fill.push(0);
            }
        }

        
    }
    return ans;
}

vector<int> posttraversal(TreeNode *root){  //post  LRN
    vector<int>ans;
    stack<TreeNode*>st;
    st.push(root);
    while(st.size()){
        TreeNode*temp=st.top();
        st.pop();

        ans.push_back(temp->val);

        if(temp->left) st.push(temp->left);
        if(temp->right) st.push(temp->right);
    }

    reverse(ans.begin(),ans.end());

    return ans;
}

int main(){

    TreeNode* a= new TreeNode(10);
    TreeNode* b= new TreeNode(20);
    TreeNode* c= new TreeNode(30);
    TreeNode* d= new TreeNode(40);
    TreeNode* e= new TreeNode(50);
    TreeNode* f= new TreeNode(60);
    TreeNode* g= new TreeNode(70);

    //making the trees....
    a->left=b;      //first level
    a->right=c;

    b->left=d;   //second level
    b->right=e;
    c->left=f;
    c->right=g;

    cout<<"pre traversal : ";
   vector<int>pre= pretraversal(a);
   for(int i:pre){
        cout<<i<<" ";
   }
    cout<<endl;

    cout<<"In traversal : ";
    vector<int>in= intraversal(a);
   for(int i:in){
        cout<<i<<" ";
   }
   cout<<endl;
    cout<<"Post traversal : ";
    vector<int>post= posttraversal(a);
   for(int i:post){
        cout<<i<<" ";
   }
    cout<<endl;
    
    return 0;
}