#include <iostream>
#include <vector>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(NULL), right(NULL) {}
};

void inorder(Node* root, vector<int>& v) {
    if (root == NULL) return;
    inorder(root->left, v);
    v.push_back(root->data);
    inorder(root->right, v);
}

void postorder(Node* root, vector<int>& v, int &idx) {
    if (root == NULL) return;
    postorder(root->left, v, idx);
    postorder(root->right, v, idx);
    root->data = v[idx++];
}

void convertToMaxHeapUtil(Node* root) {
    vector<int> v;
    inorder(root, v);
    int idx = 0;
    postorder(root, v, idx);
}

void preorder(Node* root) {
    if (root == NULL) return;
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

int main() {
    Node* root = new Node(4);
    root->left = new Node(2);
    root->right = new Node(6);
    root->left->left = new Node(1);
    root->left->right = new Node(3);
    root->right->left = new Node(5);
    root->right->right = new Node(7);

    convertToMaxHeapUtil(root);

    preorder(root);  // Output should be max-heap preorder traversal
    return 0;
}
