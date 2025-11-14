#include<iostream>
#include<algorithm>
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



int Treeheight(TreeNode *root){
     if(root==NULL) return 0;
    return 1 + max(Treeheight(root->left) , Treeheight(root->right));
}

int leafnode(TreeNode *root){
    if(!root) return 0;

    if(root->left==NULL && root->right==NULL) return 1;


    return leafnode(root->left) + leafnode(root->right);
}


int nonleafnode(TreeNode *root){
      if(!root) return 0;

    if(root->left==NULL && root->right==NULL) return 0;


    return 1 + nonleafnode(root->left) + nonleafnode(root->right);
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

    cout<<leafnode(a)<<endl;
    cout<<nonleafnode(a)<<endl;
    
    return 0;
}