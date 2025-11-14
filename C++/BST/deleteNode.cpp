#include<iostream>
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

Node* deleteNode(Node* root, int key) {
        if(!root)return NULL;

        if(root->val>key){    //finding the targer node
            root->left=deleteNode(root->left,key);
            return root;
        }
        else if(root->val<key){
            root->right=deleteNode(root->right,key);
            return root;
        }
        else{ // root==key
            if(!root->left && !root->right){    //deleting leaf node and return back NULL
                delete root;
                return NULL;
            }
            else if(!root->right){ //only left of target exist so delet the target and return back address of left
                Node *temp=root->left;
                delete root ;
                return temp;
            }
            else if( !root->left){ //only right exist so return back its address to upward node
                Node *temp=root->right;
                delete root;
                return temp;
            }
            else{              //both child are exist
                Node *child=root->left;
                Node *parent=root;

                //for right most node
                while(child->right){          //going to right most node of left side (to replace target)
                    parent=child;
                    child=child->right;
                }

                if(root!=parent){                  //disconnecting rightmost node from its parent
                    parent->right=child->left;     //and attack it in place of target and delete the target
                    child->left=root->left;
                    child->right=root->right;
                    delete root;
                    return child;
                }
                else{                             //if parent is the target(root) than
                    child->right=root->right;     //child ka right =parent ka right and return child 
                    delete root;                  //and delete the target or parent or root
                    return child;
                }
            }
        }
}



int main(){
    int arr[]={5,3,7,9,2,4,8,34,78,23};
    int n=sizeof(arr)/sizeof(arr[0]);
    Node *root=NULL;
    for(int i=0;i<n;i++){
        root=insert(root,arr[i]);
    }

    inorder(root);
    cout<<endl;            //prints in accending order
    
    
    return 0;
}       