#include <iostream>
#include <climits>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Helper function to compute min difference
void helper(TreeNode* root, int &ans, int &prev) {
    if (root == NULL) return;

    helper(root->left, ans, prev);
    if (prev != INT_MIN)
        ans = min(ans, root->val - prev);
    prev = root->val;
    helper(root->right, ans, prev);
}

// Function to find minimum difference in BST
int minDiffInBST(TreeNode* root) {
    int ans = INT_MAX;
    int prev = INT_MIN;
    helper(root, ans, prev);
    return ans;
}

// Create sample BST and call function
int main() {
    /*
            4
           / \
          2   6
         / \
        1   3
    */

    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(6);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);

    cout << "Minimum difference between values of any two nodes: ";
    cout << minDiffInBST(root) << endl;

    return 0;
}
