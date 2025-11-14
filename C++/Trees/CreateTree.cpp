#include<iostream>

using namespace std;

class treenode{
    public:
    int val;
    treenode *left;
    treenode *right;

    treenode(int c){
        val=c;
        left=right=nullptr;
    }
};

void display(treenode* root){
    if(root==nullptr) return;
    cout<<root->val<<" ";
    display(root->left);
    display(root->right);
}

treenode * binarytree(){
    int x;
    cin>>x;

    if(x==0) return NULL;

    treenode *temp=new treenode(x);
    cout<<"Enter the left child of "<<x<<" : ";
    temp->left=binarytree();
    cout<<"Enter the right child of "<<x<<" : ";
    temp->right=binarytree();
    return temp;
}


int main(){
    cout<<"Enter the root node: "<<endl;
    treenode* root=binarytree();
    cout<<endl;
    display(root);
    return 0;
}