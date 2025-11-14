#include<iostream>
#include<vector>
using namespace std;

class Node{
    public:
    int val;
    Node* left;
    Node* right;

    Node(int x){
        val=x;
        left=right=NULL;
    }
};

Node * insert(Node *root,int target){
    if(root==NULL){
        Node *temp= new Node(target);
        return temp;
    }

    if(root->val>target){
        root->left= insert(root->left,target);
    }
    else{
        root->right =insert(root->right,target);
    }
    return root;
}

void inorder(Node *root){
    if(!root){
        return ;
    }
    inorder(root->left);
    cout<<root->val<<" ";
    inorder(root->right);
}

bool search(Node *root,int tar){
    if(!root) return false;

    if(root->val==tar)return 1;

    if(tar<root->val){
        return search(root->left,tar);
    }
    else{
        return search(root->right,tar);
    }
}

int main(){
    
    cout<<"Enter the No. Of Values : ";
    int n;
    cin>>n;
    vector<int>arr(n);
    cout<<"Enter the Values to be inserted in BST : ";
    for(int i=0;i<n;i++){
        int val;
        cin>>val;
        arr[i]=val;
    }
    
    Node *root=NULL;
    for(int i=0;i<n;i++){
        root=insert(root,arr[i]);
    }

    cout<<"Inorder Traversal : ";
    inorder(root);
    cout<<endl;            //prints in accending order
   
    
    return 0;
}       