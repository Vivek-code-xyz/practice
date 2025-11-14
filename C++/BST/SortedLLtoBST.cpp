#include <iostream>
#include <vector>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

TreeNode* create(vector<int>& ans, int st, int end) {
    if (st > end) return NULL;
    int mid = st + (end - st + 1) / 2;
    TreeNode* root = new TreeNode(ans[mid]);
    root->left = create(ans, st, mid - 1);
    root->right = create(ans, mid + 1, end);
    return root;
}

TreeNode* sortedListToBST(ListNode* head) {
    vector<int> ans;
    while (head) {
        ans.push_back(head->val);
        head = head->next;
    }
    return create(ans, 0, ans.size() - 1);
}

// Helper function to print tree inorder
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// Helper function to create linked list from array
ListNode* createList(vector<int>& arr) {
    if (arr.empty()) return NULL;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (int i = 1; i < arr.size(); ++i) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

int main() {
    vector<int> input = {-10, -3, 0, 5, 9};  // sorted list
    ListNode* head = createList(input);

    TreeNode* root = sortedListToBST(head);

    cout << "Inorder Traversal of BST: ";
    inorder(root);  // should print the elements in sorted order
    cout << endl;

    return 0;
}
