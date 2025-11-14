#include<iostream>
#include<queue>
#include<vector>
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

vector<int> levelorder(TreeNode* root){  //for entire tree
    vector<int>ans;
    queue<TreeNode*>q;
    q.push(root);
    
  
    while(!q.empty()){
       
        ans.push_back(q.front()->val);
        if(q.front()->left)
        q.push(q.front()->left);
        
        if(q.front()->right)
        q.push(q.front()->right);
       
       
        q.pop();

    }
    return ans;
}

vector<vector<int>> levelOrder(TreeNode* root) {    //for each level
        vector<vector<int>>answer;
        queue<TreeNode*>q;
        if(root) q.push(root);
        while(!q.empty()){
        vector<int>ans;
        int n=q.size();
        for(int i=0;i<n;i++){
            TreeNode* temp=q.front();
            q.pop();
            ans.push_back(temp->val);
            if(temp->left) q.push(temp->left);
            if(temp->right) q.push(temp->right);
        }

        answer.push_back(ans);
        
    }
        return answer;
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

    vector<int>an = levelorder(a);
    for(int i:an){
        cout<<i<<" ";
    }
    return 0;
}