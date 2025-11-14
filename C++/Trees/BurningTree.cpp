#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// ------ Solution Class ------
class Solution {
public:
    int burn(TreeNode* root, int &timer, int start) {
        if (root == NULL) return 0;
        if (root->val == start) return -1;

        int l = burn(root->left, timer, start);
        int r = burn(root->right, timer, start);

        if (l < 0) {
            timer = max(timer, abs(l) + r);
            return l - 1;
        }
        if (r < 0) {
            timer = max(timer, l + abs(r));
            return r - 1;
        }

        return 1 + max(l, r);
    }

    int height(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(height(root->left), height(root->right));
    }

    void find(TreeNode* root, int tar, TreeNode* &burnode) {
        if (root == NULL) return;
        if (root->val == tar) {
            burnode = root;
            return;
        }
        find(root->left, tar, burnode);
        find(root->right, tar, burnode);
    }

    int amountOfTime(TreeNode* root, int start) {
        if (!root->left && !root->right) return 0;
        int timer = 0;
        burn(root, timer, start);
        TreeNode* burnode = NULL;
        find(root, start, burnode);
        int heigh = height(burnode);
        return max(timer, heigh);
    }
};

// ------ Helper function to print test result ------
void test() {
    /*
        Example Tree:
                  1
                 / \
                2   3
               / \
              4   5
        Start from node 2
        Expected time to burn all: 3
    */
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    Solution sol;
    int start = 2;
    cout << "Time to burn entire tree: " << sol.amountOfTime(root, start) << endl;
}

// ------ Main Function ------
int main() {
    test();
    return 0;
}
