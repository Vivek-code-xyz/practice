#include <iostream>
#include <climits>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
    Node(int v) : data(v), left(NULL), right(NULL) {}
};

// Recursive function to detect dead end
bool dead(Node *root, int lo, int up) {
    if (!root) return false;

    // Leaf node
    if (!root->left && !root->right) {
        if (root->data - lo == 1 && up - root->data == 1)
            return true;
        else
            return false;
    }

    // Check in left and right subtree
    return dead(root->left, lo, root->data) || dead(root->right, root->data, up);
}

// Function to check for dead end
bool isDeadEnd(Node *root) {
    return dead(root, 0, INT_MAX);
}

// Helper function to insert node in BST
Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

// Main function to test
int main() {
    /* Test BST:
               8
             /   \
            5    11
           / \
          2   7
         /
        1
       Dead End = 1
    */

    Node* root = NULL;
    root = insert(root, 8);
    insert(root, 5);
    insert(root, 2);
    insert(root, 3);
    insert(root, 7);
    insert(root, 11);
    insert(root, 1);

    if (isDeadEnd(root))
        cout << "Dead End exists in the BST\n";
    else
        cout << "No Dead End in the BST\n";

    return 0;
}
