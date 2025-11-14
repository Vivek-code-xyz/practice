#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Definition of TreeNode
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) {
        val = x;
        left = right = NULL;
    }
};

// Function to build BST from preorder
TreeNode* build(vector<int>& arr, int lo, int up, int& i) {
    if (i == arr.size()) return NULL;

    if (arr[i] < lo || arr[i] > up) return NULL;

    TreeNode* root = new TreeNode(arr[i]);
    i++;

    root->left = build(arr, lo, root->val, i);
    root->right = build(arr, root->val, up, i);

    return root;
}

// Wrapper function
TreeNode* bstFromPreorder(vector<int>& preorder) {
    int idx = 0;
    return build(preorder, INT_MIN, INT_MAX, idx);
}

// Helper function to print inorder (for testing)
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    vector<int> preorder = {8, 5, 1, 7, 10, 12}; // test case

    TreeNode* root = bstFromPreorder(preorder);

    cout << "Inorder traversal of BST built from preorder: ";
    inorder(root); // Expected: 1 5 7 8 10 12
    cout << endl;

    return 0;
}

    // structure of tree built
    //     8
    //    / \
    //   5   10
    //  / \    \
    // 1   7    12
