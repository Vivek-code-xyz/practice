#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

bool helper(TreeNode *root, long long& prev) {
    if (!root) return 1;

    int l = helper(root->left, prev);
    if (l == 0) return 0;
    if (root->val <= prev) return 0;
    prev = root->val;
    return helper(root->right, prev);
}

bool isValidBST(TreeNode* root) {
    long long prev = LONG_MIN;
    return helper(root, prev);
}

int main() {
    // Constructing the following BST:
    //        5
    //       / \
    //      3   7
    //     / \   \
    //    2   4   8

    TreeNode* root = new TreeNode(5);
    root->left = new TreeNode(3);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(2);
    root->left->right = new TreeNode(4);
    root->right->right = new TreeNode(8);

    if (isValidBST(root)) {
        cout << "The tree is a valid BST." << endl;
    } else {
        cout << "The tree is NOT a valid BST." << endl;
    }

    return 0;
}
