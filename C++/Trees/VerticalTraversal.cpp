#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
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

    void find(TreeNode* root,int i,int &l,int &r){
        if(!root) return;
        l=min(l,i);
        r=max(r,i);
        find(root->left,i-1,l,r);
        find(root->right,i+1,l,r);
    }
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        vector<vector<int>>ans;
        int l=0,r=0;
        find(root,0,l,r);
        vector<vector<int>>neg(abs(l)+1);
        vector<vector<int>>pos(r+1);
        queue<TreeNode*>q;
        queue<int>idx;
        q.push(root);
        idx.push(0);
        while(q.size()){
            TreeNode*temp=q.front();
            int i=idx.front();
            q.pop();
            idx.pop();

            if(i>=0){
                pos[i].push_back(temp->val);
            }
            else{
                neg[abs(i)].push_back(temp->val);
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
        for(int i=neg.size()-1;i>0;i--){
            ans.push_back(neg[i]);
        }
        for(int i=0;i<pos.size();i++){
            ans.push_back(pos[i]);
        }
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


    vector<vector<int>>ans=verticalTraversal(a);
    cout<<"vectical traversal of this binary tree is : "<<endl;
    for(int i=0;i<ans.size();i++){
        for(int j=0;j<ans[i].size();j++){
            cout<<ans[i][j]<<" ";
        }
        cout<<endl;
    }

    return 0;

}