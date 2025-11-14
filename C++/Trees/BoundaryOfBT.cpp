#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

    class Node{
        public: 
        int data;
        Node *left;
        Node *right;
        Node(int x){
        data=x;
        left=nullptr;
        right=nullptr;
        }
    };

 
 
 
 
 void lefttree(Node*root,vector<int>&ans){
        if(!root) return;
        if(!root->left &&!root->right) return; //leaf
        
        ans.push_back(root->data);
        
        if(root->left)
            lefttree(root->left,ans);
        else{
            lefttree(root->right,ans);
        }
    }
    
    void leaf(Node*root,vector<int>&ans){
        if(!root) return;
        if(!root->left &&!root->right) ans.push_back(root->data);
        if(root->left)
            leaf(root->left,ans);
        if(root->right){
            leaf(root->right,ans);
        }
    }
    
    void righttree(Node*root,vector<int>&ans){
        if(!root) return;
        if(!root->left &&!root->right) return; //leaf
        
        
        if(root->right)
            righttree(root->right,ans);
        else{
            righttree(root->left,ans);
        }
        ans.push_back(root->data);
        
    }
    vector<int> boundaryTraversal(Node *root) {
        // code here
        vector<int>ans;
        ans.push_back(root->data);
        
        lefttree(root->left,ans);
        
        if(root->left ||root->right)
            leaf(root,ans);
        righttree(root->right,ans);
        return ans;
    }

    int main(){ 
    Node* a= new Node(10);
    Node* b= new Node(20);
    Node* c= new Node(30);
    Node* d= new Node(40);
    Node* e= new Node(50);
    Node* f= new Node(60);
    Node* g= new Node(70);

    //making the trees....
    a->left=b;      //first level
    a->right=c;

    b->left=d;   //second level
    b->right=e;
    c->left=f;
    c->right=g;


    vector<int>ans=boundaryTraversal(a);
    cout<<"boundary traversal of this binary tree is : "<<endl;
    for(int i=0;i<ans.size();i++){
       cout<<ans[i]<<" ";
    }
    cout<<endl;

    return 0;

}