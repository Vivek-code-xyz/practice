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

vector<int> rightview(TreeNode* root){  //for entire tree
    vector<int>ans;
    queue<TreeNode*>q;
    q.push(root);
    
  
    while(!q.empty()){
       ans.push_back(q.front()->val);
       int n=q.size();
       while(n--){ 
           if(q.front()->right)
           q.push(q.front()->right);
          
           if(q.front()->left)
            q.push(q.front()->left);
    
            q.pop();
        }

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

    vector<int>an = rightview(a);
    for(int i:an){
        cout<<i<<" ";
    }
    return 0;
}