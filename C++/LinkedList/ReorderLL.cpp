#include <iostream>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

// Helper function to print linked list
void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << " -> ";
        head = head->next;
    }
    cout << endl;
}

// Reverse a linked list
ListNode* reverseList(ListNode* head) {
    ListNode *curr = head, *pre = NULL, *nxt = NULL;
    while (curr) {
        nxt = curr->next;
        curr->next = pre;
        pre = curr;
        curr = nxt;
    }
    return pre;
}

// Reorder list as per the pattern: 1->n->2->n-1->3->...
void reorderList(ListNode* &head) {
    if (!head || !head->next || !head->next->next) return;

    // Step 1: Find middle
    ListNode *slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    // Step 2: Reverse second half
    ListNode *second = reverseList(slow->next);
    slow->next = NULL;

    // Step 3: Merge both halves
    ListNode *first = head;
    while (first && second) {
        ListNode* temp1 = first->next;
        ListNode* temp2 = second->next;

        first->next = second;
        if (temp1 == NULL) break;
        second->next = temp1;

        first = temp1;
        second = temp2;
    }
}

// Test case
int main() {
    // Create list: 1 -> 2 -> 3 -> 4 -> 5
    ListNode* head = new ListNode(1);
    ListNode* temp = head;
    for (int i = 2; i <= 5; ++i) {
        temp->next = new ListNode(i);
        temp = temp->next;
    }

    cout << "Original list: ";
    printList(head);

    reorderList(head);

    cout << "Reordered list: ";
    printList(head);

    return 0;
}
