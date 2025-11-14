#include<iostream>
#include<algorithm>
using namespace std;

class node{
    public:
    int val;
    node*left;
    node*right;
    int height;

    node(int x){
        val=x;
        left=right=nullptr;
        height=1;
    }

};

int geth(node*root){
    if(root==NULL) return 0;
    return root->height;
}

node* leftrotation(node *root){
    node *child=root->right;
    node *childleft=child->left;

    child->left=root;
    root->right=childleft;

    root->height=1+max(geth(root->left),geth(root->right));
    child->height=1+max(geth(child->left),geth(child->right));
    return child;
}
node* rightrotation(node *root){
    node*child=root->left;
    node* childright=child->right;

    child->right=root;
    root->left=childright;

    root->height=1+max(geth(root->left),geth(root->right));
    child->height=1+max(geth(child->left),geth(child->right));
    return child;
}

node *insert(node*root,int x){
    if(root==NULL) {
        return new node(x);
    }

    if(root->val < x)
        root->right= insert(root->right,x);
    else if(root->val>x)
        root->left= insert(root->left,x);
    else
        return root;

    //modifying the height of BSt
    root->height = 1 + max(geth(root->left),geth(root->right));

    int balance = geth(root->left) - geth(root->right);

    //left left case
    if(balance>1 && root->left->val > x){
       return rightrotation(root);
    }
    //right right case
    else if(balance<-1 && root->right->val < x){
       return leftrotation(root);
    }
    //left right case
    else if(balance>1 && root->left->val < x){
       root->left= leftrotation(root->left);
        return rightrotation(root);
    }
    //right left case
    else if(balance<-1 && root->right->val > x){
       root->right = rightrotation(root->right);
        return leftrotation(root);
    }
    //tree is balanced
    else{
        return root;
    }

}

void inorder(node*root){
    if(root==NULL) return;

    inorder(root->left);
    cout<<root->val<<" ";
    inorder(root->right);
}

int main(){
    node *root=NULL;
    root=insert(root,10);
    root=insert(root,20);
    root=insert(root,30);
    root=insert(root,40);
    root=insert(root,50);
    root=insert(root,60);
    root=insert(root,70);
    root=insert(root,90);
    inorder(root);
    return 0;
}