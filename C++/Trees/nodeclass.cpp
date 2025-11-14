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

void display(TreeNode *root){
    if(root==nullptr) return ;
    cout<<root->val<<" ";
    display(root->left);
    display(root->right);
}

int Nodecount(TreeNode *root){
    if(root==NULL) return 0;
    return 1+Nodecount(root->left) + Nodecount(root->right);
}

int Treelevel(TreeNode *root){
     if(root==NULL) return 0;
    return 1 + max(Treelevel(root->left) , Treelevel(root->right));
}

int Treeheight(TreeNode *root){
    return Treelevel(root)-1;
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

    display(a);
    cout<<endl;
    cout<<Nodecount(a);
    cout<<endl;
    cout<<Treelevel(a);
    cout<<endl;
    cout<<Treeheight(a);
    return 0;
}
