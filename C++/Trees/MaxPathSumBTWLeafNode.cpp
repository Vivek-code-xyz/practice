#include <iostream>
#include <climits>
using namespace std;

// Definition for a binary tree node
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Function as provided
int path(TreeNode *root,int &sum){
    if(!root)return 0;
    if(!root->left && !root->right) return root->val;

    int l=path(root->left,sum);
    int r=path(root->right,sum);

    if(root->left && root->right){
        sum=max(sum,root->val+l+r);
        return root->val + max(l,r);
    }

    if(root->left){
        return root->val + l;
    }
    else {
        return root->val+r;
    }
}

int maxPathSum(TreeNode* root) {
    int sum=INT_MIN;
    int ans=path(root,sum);

    if(root->left && root->right){
        return sum;
    }
    return max(ans,sum);
}

// MAIN FUNCTION
int main() {
    // Creating the tree:
    //       2
    //      / \
    //    -1   3
    TreeNode* root = new TreeNode(2);
    root->left = new TreeNode(-1);
    root->right = new TreeNode(3);

    int result = maxPathSum(root);
    cout << "Maximum Path Sum: " << result << endl;

    // Free memory
    delete root->left;
    delete root->right;
    delete root;

    return 0;
}
