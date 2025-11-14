#include <iostream>
using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;

    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Function to flatten the binary tree into a linked list in-place
void flatten(TreeNode* root) {
    while (root) {
        if (root->left) {
            TreeNode *temp = root->left;
            while (temp->right) {
                temp = temp->right;
            }
            temp->right = root->right;
            root->right = root->left;
            root->left = NULL;
        }
        root = root->right;
    }
    return;
}

// Function to print the right-skewed flattened tree
void printFlattened(TreeNode* root) {
    while (root) {
        cout << root->val << " ";
        root = root->right;
    }
    cout << endl;
}

int main() {
    /*
        Constructing this binary tree:
                1
               / \
              2   5
             / \   \
            3   4   6
    */

    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(5);
    root->left->left = new TreeNode(3);
    root->left->right = new TreeNode(4);
    root->right->right = new TreeNode(6);

    // Flatten the binary tree
    flatten(root);

    // Print the flattened linked list
    printFlattened(root);

    return 0;
}
