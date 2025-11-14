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

// Function to reverse a linked list
ListNode* reverseList(ListNode* head) {
    ListNode *curr = head, *prev = NULL, *next = NULL;
    while (curr) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Function to reverse a sublist from position left to right
ListNode* reverseBetween(ListNode* head, int left, int right) {
    if (left == right || head == NULL) return head;

    ListNode dummy(0);
    dummy.next = head;
    ListNode* prev = &dummy;

    for (int i = 1; i < left; ++i) {
        prev = prev->next;
    }

    ListNode* start = prev->next;
    ListNode* end = start;
    for (int i = left; i < right; ++i) {
        end = end->next;
    }

    ListNode* post = end->next;
    end->next = NULL;

    ListNode* new_head = reverseList(start);
    prev->next = new_head;
    start->next = post;

    return dummy.next;
}

// Test case
int main() {
    // Create linked list: 1 -> 2 -> 3 -> 4 -> 5
    ListNode* head = new ListNode(1);
    ListNode* temp = head;
    for (int i = 2; i <= 5; ++i) {
        temp->next = new ListNode(i);
        temp = temp->next;
    }

    cout << "Original list: ";
    printList(head);

    int left = 2, right = 4;
    head = reverseBetween(head, left, right);

    cout << "List after reversing between " << left << " and " << right << ": ";
    printList(head);

    return 0;
}
