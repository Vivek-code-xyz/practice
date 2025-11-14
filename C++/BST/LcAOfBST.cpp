#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int v) : val(v), left(NULL), right(NULL) {}
};

// Function to find LCA in a BST
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode*& p, TreeNode*& q) {
    if (root == NULL) return NULL;

    if (p->val > root->val && q->val > root->val)
        return lowestCommonAncestor(root->right, p, q);
    else if (p->val < root->val && q->val < root->val)
        return lowestCommonAncestor(root->left, p, q);
    else
        return root;
}

// Helper function to insert node in BST
TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

// Main function to test
int main() {
    /* Create the BST:
              6
            /   \
           2     8
          / \   / \
         0   4 7   9
            / \
           3   5
    */

    TreeNode* root = new TreeNode(6);
    insert(root, 2);
    insert(root, 8);
    insert(root, 0);
    insert(root, 4);
    insert(root, 7);
    insert(root, 9);
    insert(root, 3);
    insert(root, 5);

    TreeNode* p = root->left;        // Node with value 2
    TreeNode* q = root->left->right; // Node with value 4

    TreeNode* lca = lowestCommonAncestor(root, p, q);
    if (lca)
        cout << "LCA of " << p->val << " and " << q->val << " is: " << lca->val << endl;
    else
        cout << "LCA not found." << endl;

    return 0;
}
