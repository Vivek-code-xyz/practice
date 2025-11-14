#include<iostream>
#include<queue>
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

int main(){
    int x;
    int first,sec;
    cout<<"Enter values of tree levelwise and left to right : ";
    cin>>x;
    queue<treenode*>q;
    treenode *root= new treenode(x);
    q.push(root);
    while(!q.empty()){
        treenode *temp=q.front();
        q.pop();
        cout<<"enter left value : ";
        cin>>first;
        if(first!=0){
            temp->left= new treenode(first);
            q.push(temp->left);
        }
        cout<<"enter right value : ";
        cin >>sec;
        if(sec){
            temp->right=new treenode(sec);
            q.push(temp->right);
        }
        
    }
    cout<<endl;
    cout<<"tree is made sucessfully..."<<endl;

    cout<<"values at tree is : ";

    display(root);

    return 0;

}