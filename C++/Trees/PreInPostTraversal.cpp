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

void pretraversal(TreeNode *root){   //pre  NLR
    if(root==nullptr) return ;
    cout<<root->val<<" ";
    pretraversal(root->left);
    pretraversal(root->right);
}

void intraversal(TreeNode *root){  // in LNR
    if(root==nullptr) return ;
    intraversal(root->left);
    cout<<root->val<<" ";
    intraversal(root->right);
}

void posttraversal(TreeNode *root){  //post  LRN
    if(root==nullptr) return ;
    posttraversal(root->left);
    posttraversal(root->right);
    cout<<root->val<<" ";
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
    pretraversal(a);
    cout<<endl;

    cout<<"In traversal : ";
    intraversal(a);
    cout<<endl;

    cout<<"Post traversal : ";
    posttraversal(a);
    cout<<endl;
    
    return 0;
}