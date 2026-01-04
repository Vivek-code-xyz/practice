#include<stdio.h>
#include<stdlib.h>

typedef struct node{
    int data;
    struct node* left;
    struct node* right;
}TreeNode;

TreeNode* InsertNode(int x){
    TreeNode* newnode= (TreeNode*)malloc(sizeof(TreeNode));

    newnode->data=x;
    newnode->left=NULL;
    newnode->right=NULL;

    return newnode;
}

void InOrder(TreeNode * root){
    if(root==NULL) return;

    InOrder(root->left);
    printf("%d ",root->data);
    InOrder(root->right);

    
}

void PreOrder(TreeNode * root){
    if(root==NULL) return;
    
    printf("%d ",root->data);
    PreOrder(root->left);
    PreOrder(root->right);
   
}

void PostOrder(TreeNode * root){
    if(root==NULL) return;
    
    PostOrder(root->left);
    PostOrder(root->right);
    printf("%d ",root->data);
    
}

int main(){

    TreeNode* root = InsertNode(5);
    root->left = InsertNode(6);
    root->right = InsertNode(7);
    root->left->left = InsertNode(8);
    root->left->right= InsertNode(9);

    PreOrder(root);
    printf("\n");
    InOrder(root);
    printf("\n");
    PostOrder(root);

    return 0;

}