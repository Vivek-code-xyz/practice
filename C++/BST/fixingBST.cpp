#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Recover Tree function (Morris Traversal approach)
void recoverTree(TreeNode* root) {
    TreeNode *first = NULL, *second = NULL, *last = NULL, *present = NULL, *curr = NULL;

    while (root) {
        if (!root->left) {
            last = present;
            present = root;
            if (last && last->val > present->val) {
                if (!first) first = last;
                second = present;
            }
            root = root->right;
        } else {
            curr = root->left;
            while (curr->right && curr->right != root) {
                curr = curr->right;
            }

            if (!curr->right) {
                curr->right = root;
                root = root->left;
            } else {
                curr->right = NULL;
                last = present;
                present = root;
                if (last && last->val > present->val) {
                    if (!first) first = last;
                    second = present;
                }
                root = root->right;
            }
        }
    }

    if (first && second) {
        swap(first->val, second->val);
    }
}

// Helper to print inorder traversal
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    /*
        Constructing a BST with two nodes swapped:
                 3
                / \
               1   4
                  /
                 2

        The correct BST should be:
                 2
                / \
               1   4
                  /
                 3
        Nodes 2 and 3 are swapped.
    */

    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(1);
    root->right = new TreeNode(4);
    root->right->left = new TreeNode(2);

    cout << "Inorder before recovery: ";
    inorder(root);
    cout << endl;

    recoverTree(root);

    cout << "Inorder after recovery: ";
    inorder(root);
    cout << endl;

    return 0;
}
