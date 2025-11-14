#include<iostream>
#include<vector>
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

vector<int> inorder(TreeNode *root){    //LNR
    vector<int>ans;

    while(root){
        if(!root->left){
            ans.push_back(root->val);
            root=root->right;
        }
        else{
            TreeNode *temp=root->left;
            while(temp->right && temp->right!=root){
                temp=temp->right;
            }

            if(temp->right==NULL){   //left is not traversed
                temp->right=root;
                root=root->left;
            }

            else{   //left is traversed now go to right
                ans.push_back(root->val);
                temp->right=NULL;
                root=root->right;
            }

        }
    }
    return ans;
}

vector<int> preorder(TreeNode *root){
     vector<int>ans;

    while(root){
        if(!root->left){
            ans.push_back(root->val);
            root=root->right;
        }
        else{
            TreeNode *temp=root->left;
            while(temp->right && temp->right!=root){
                temp=temp->right;
            }

            if(temp->right==NULL){   //left is not traversed
                ans.push_back(root->val);
                temp->right=root;
                root=root->left;
            }

            else{   //left is traversed now go to right
               
                temp->right=NULL;
                root=root->right;
            }

        }
    }
    return ans;
}

vector<int> postorder(TreeNode*root){
    vector<int>ans;
     while(root){
        if(!root->right){
            ans.push_back(root->val);
            root=root->left;
        }
        else{
            TreeNode *temp=root->left;
            while(temp->left && temp->left!=root){
                temp=temp->left;
            }

            if(temp->left==NULL){   //right is not traversed
                ans.push_back(root->val);
                temp->left=root;
                root=root->right;
            }

            else{   //right is traversed now go to left
               
                temp->left=NULL;
                root=root->left;
            }

        }
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
   vector<int>pre= preorder(a);
   for(int i:pre){
        cout<<i<<" ";
   }
    cout<<endl;

    cout<<"In traversal : ";
    vector<int>in= inorder(a);
   for(int i:in){
        cout<<i<<" ";
   }
   cout<<endl;
    cout<<"Post traversal : ";
    vector<int>post= postorder(a);
   for(int i:post){
        cout<<i<<" ";
   }
    cout<<endl;
    
    return 0;
}