#include <iostream>
using namespace std;

// Definition for a binary tree node
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Helper function to find kth smallest element
void helper(TreeNode* root, int &ans, int &k) {
    if (root == NULL) return;

    helper(root->left, ans, k);

    k--;
    if (k == 0) {
        ans = root->val;
        return;
    }

    helper(root->right, ans, k);
}

// Main function to call helper
int kthSmallest(TreeNode* root, int k) {
    int ans = 0;
    helper(root, ans, k);
    return ans;
}

int main() {
    /*
            5
           / \
          3   6
         / \
        2   4
       /
      1

    In-order traversal: 1, 2, 3, 4, 5, 6
    */

    // Construct the BST
    TreeNode* root = new TreeNode(5);
    root->left = new TreeNode(3);
    root->right = new TreeNode(6);
    root->left->left = new TreeNode(2);
    root->left->right = new TreeNode(4);
    root->left->left->left = new TreeNode(1);

    int k = 3;
    cout << "The " << k << "rd smallest element in BST is: " << kthSmallest(root, k) << endl;

    return 0;
}
