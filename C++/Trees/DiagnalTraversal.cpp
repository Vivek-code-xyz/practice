#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
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

   
   
    void find(TreeNode*root,int &l,int pos){
        if(root==NULL) return ;
        l=max(pos,l);
        
        find(root->left,l,pos+1);
        find(root->right,l,pos);
    }
    
    void finddig(TreeNode*root,int pos,vector<vector<int>>&ans){
        if(root==NULL) return;
        
        ans[pos].push_back(root->val);
        
        finddig(root->left,pos+1,ans);
        finddig(root->right,pos,ans);
    }
    vector<int> diagonal(TreeNode *root) {
        // code here
        int l;
        
        find(root,l,0);
        vector<vector<int>>ans(l+1);
        
        finddig(root,0,ans);
        
        vector<int>temp;
        for(int i=0;i<ans.size();i++){
            for(int j=0;j<ans[i].size();j++){
                temp.push_back(ans[i][j]);
            }
        }
        return temp;
        
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


    vector<int>ans=diagonal(a);
    cout<<"diagonal traversal of this binary tree is : "<<endl;
    for(int i=0;i<ans.size();i++){
       cout<<ans[i]<<" ";
    }
    cout<<endl;

    return 0;

}