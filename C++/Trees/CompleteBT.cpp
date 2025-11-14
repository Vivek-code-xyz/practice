#include <iostream>
#include <queue>
using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Count total number of nodes in the binary tree
int count(TreeNode* root) {
    if (root == NULL) return 0;
    return 1 + count(root->left) + count(root->right);
}

// Check if binary tree is complete
bool iscbt(TreeNode* root, int idx, int n) {
    if (root == NULL) return true;
    if (idx >= n) return false;

    return iscbt(root->left, idx * 2 + 1, n) &&
           iscbt(root->right, idx * 2 + 2, n);
}

// Main function to check completeness
bool isCompleteTree(TreeNode* root) {
    int n = count(root);
    return iscbt(root, 0, n);
}

// Helper to build a simple test tree
TreeNode* buildSampleTree1() {
    /*
          1
         / \
        2   3
       / \  /
      4  5 6
    */
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->right->left = new TreeNode(6);
    return root;
}

TreeNode* buildSampleTree2() {
    /*
          1
         / \
        2   3
       / \    \
      4  5     7
    */
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->right->right = new TreeNode(7); // Missing left child at level 2
    return root;
}

int main() {
    // Test Case 1: Should return true (complete binary tree)
    TreeNode* root1 = buildSampleTree1();
    cout << "Test Case 1 - Is Complete Tree? " << (isCompleteTree(root1) ? "Yes" : "No") << endl;

    // Test Case 2: Should return false (not a complete binary tree)
    TreeNode* root2 = buildSampleTree2();
    cout << "Test Case 2 - Is Complete Tree? " << (isCompleteTree(root2) ? "Yes" : "No") << endl;

    return 0;
}
