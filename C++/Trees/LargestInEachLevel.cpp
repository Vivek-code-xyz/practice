#include<iostream>
#include<queue>
#include<vector>
#include<climits>
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

    vector<int> largestValues(TreeNode* root) {
        vector<int>ans;
        queue<TreeNode *>q;
       if(root) q.push(root);
        while(q.size()>0){
            int mx=INT_MIN;
            int n=q.size();
            for(int i=0;i<n;i++){
                TreeNode *temp=q.front();
                q.pop();
                  mx=max(mx,temp->val);
                
                if(temp->left) q.push(temp->left);
                if(temp->right) q.push(temp->right);
            }
            ans.push_back(mx);
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

    vector<int>an = largestValues(a);
    for(int i:an){
        cout<<i<<" ";
    }
    return 0;
}