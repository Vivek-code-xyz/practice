#include <iostream>
using namespace std;

class ListNode {
public:
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}

    void display() {
        ListNode *temp = this;
        while (temp != NULL) {
            cout << temp->val << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

ListNode* reverseList(ListNode *head) {
    ListNode *pre = NULL, *curr = head, *nxt = head;
    while (curr) {
        nxt = curr->next;
        curr->next = pre;
        pre = curr;
        curr = nxt;
    }
    return pre;
}

class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast->next != NULL && fast->next->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode *h2 = reverseList(slow->next);
        slow = head;
        fast = h2;
        while (fast) {
            if (slow->val != fast->val) return false;
            slow = slow->next;
            fast = fast->next;
        }
        return true;
    }
};

void freeList(ListNode* head) {
    while (head) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Example palindrome: 1 -> 2 -> 3 -> 2 -> 1
    ListNode *node1 = new ListNode(1);
    ListNode *node2 = new ListNode(2);
    ListNode *node3 = new ListNode(3);
    ListNode *node4 = new ListNode(2);
    ListNode *node5 = new ListNode(1);

    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    cout << "Input list: ";
    node1->display();

    Solution s;
    bool result = s.isPalindrome(node1);
    cout << "Is Palindrome? " << (result ? "Yes" : "No") << endl;

    freeList(node1);
    return 0;
}
