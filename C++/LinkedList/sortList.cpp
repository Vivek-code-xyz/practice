#include <iostream>
using namespace std;

class ListNode {
public:
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}

    void display() {
        ListNode* temp = this;
        while (temp != nullptr) {
            cout << temp->val << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

ListNode* merge(ListNode* a, ListNode* b) {
    ListNode* c = new ListNode(100);
    ListNode* temp = c;
    while (a != NULL && b != NULL) {
        if (a->val <= b->val) {
            temp->next = a;
            a = a->next;
            temp = temp->next;
        }
        else {
            temp->next = b;
            b = b->next;
            temp = temp->next;
        }
    }
    if (a == NULL) temp->next = b;
    else temp->next = a;

    ListNode* head = c->next;
    delete c; // delete dummy node
    return head;
}

class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (head == NULL || head->next == NULL) return head;

        ListNode* s = head;
        ListNode* f = head;
        while (f->next != NULL && f->next->next != NULL) {
            s = s->next;
            f = f->next->next;
        }

        ListNode* a = head;
        ListNode* b = s->next;
        s->next = NULL;

        a = sortList(a);
        b = sortList(b);

        ListNode* c = merge(a, b);
        return c;
    }
};

void freeList(ListNode* head) {
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Create an unsorted linked list: 4 -> 2 -> 1 -> 3
    ListNode* head = new ListNode(4);
    head->next = new ListNode(2);
    head->next->next = new ListNode(1);
    head->next->next->next = new ListNode(3);

    cout << "Original list: ";
    head->display();

    Solution sol;
    ListNode* sortedHead = sol.sortList(head);

    cout << "Sorted list: ";
    if (sortedHead != nullptr) sortedHead->display();

    freeList(sortedHead);

    return 0;
}
