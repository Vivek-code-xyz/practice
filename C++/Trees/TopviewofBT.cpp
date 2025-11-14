 #include<iostream>
 using namespace std;
 #include<vector>
 #include<queue>
 #include<climits>
 
 
 #include<iostream>
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
 void find(Node*root,int &l,int& r,int pos){
        if(!root) return;
        
        l=min(l,pos);
        r=max(r,pos);
        find(root->left,l,r,pos-1);
        find(root->right,l,r,pos+1);
    }

    void tview(Node *root,vector<int>&ans,vector<int>&lev,int i,int level){
        if(!root) return;

        if(level<lev[i]){
            lev[i]=level;
            ans[i]=root->data;
        }
        tview(root->left,ans,lev,i-1,level+1);
        tview(root->right,ans,lev,i+1,level+1);
    }
    vector<int>topview(Node *root){
        int l=0;
        int r=0;
        find(root,l,r,0);
        vector<int>ans(r-l+1);
        vector<int>lev(r-l+1,INT_MAX);
        tview(root,ans,lev,-1*l,0);
        return ans;
    }
    vector<int> topView(Node *root) {
        // code here
        int l=0;
        int r=0;
        find(root,l,r,0);
        vector<int>ans(r-l+1);
        vector<bool>fill(r-l+1,0);
        queue<Node*>q;
        queue<int>idx;
       if(root) q.push(root);
        idx.push(-1*l);
        
        while(q.size()){
            Node*temp=q.front();
            int i=idx.front();
            q.pop();idx.pop();
            
            if(fill[i]==0){
                fill[i]=1;
                ans[i]=temp->data;
            }
            
            if(temp->left){
                q.push(temp->left);
                idx.push(i-1);
            }
            if(temp->right){
                q.push(temp->right);
                idx.push(i+1);
            }
        }
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

    vector<int>ans=topview(a);

    for(int i:ans){
        cout<<i<<" ";
    }
   
    return 0;
}
