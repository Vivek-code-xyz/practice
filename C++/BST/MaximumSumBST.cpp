#include <iostream>
#include <climits>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class box {
    public:
    bool isbst;
    int sum;
    int mini;
    int maxi;
    
    box(){
        isbst = 1;
        sum = 0;
        mini = INT_MAX;
        maxi = INT_MIN;
    }
};

box* find(TreeNode* root, int &ans){
    if(!root){
        return new box();
    }
    else{
        box* lh = find(root->left, ans);
        box* rh = find(root->right, ans);

        if(lh->isbst && rh->isbst && lh->maxi < root->val && rh->mini > root->val){
            box* head = new box();
            head->sum = root->val + lh->sum + rh->sum;
            head->mini = min(root->val, lh->mini);
            head->maxi = max(root->val, rh->maxi);
            ans = max(ans, head->sum);
            return head;
        }
        else{
            lh->isbst = 0;
            return lh;
        }
    }
}

int maxSumBST(TreeNode* root) {
    int ans = 0;
    find(root, ans);
    return ans;
}

int main() {
    /*
        Tree Structure:

               7
              / \
             3   8
            / \   \
           2   5   10

        This is a BST. All nodes follow BST property.
        Sum = 2 + 3 + 5 + 7 + 8 + 10 = 35
    */

    TreeNode* root = new TreeNode(7);
    root->left = new TreeNode(3);
    root->right = new TreeNode(8);
    root->left->left = new TreeNode(2);
    root->left->right = new TreeNode(5);
    root->right->right = new TreeNode(10);

    int result = maxSumBST(root);
    cout << "Maximum Sum BST in Binary Tree: " << result << endl;

    return 0;
}
