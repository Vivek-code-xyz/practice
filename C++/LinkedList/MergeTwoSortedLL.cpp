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

ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
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

void freeList(ListNode* head) {
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // List a: 1->3->5
    ListNode* a1 = new ListNode(1);
    ListNode* a2 = new ListNode(3);
    ListNode* a3 = new ListNode(5);
    a1->next = a2;
    a2->next = a3;

    // List b: 2->4->6
    ListNode* b1 = new ListNode(2);
    ListNode* b2 = new ListNode(4);
    ListNode* b3 = new ListNode(6);
    b1->next = b2;
    b2->next = b3;

    cout << "List a: ";
    a1->display();

    cout << "List b: ";
    b1->display();

    ListNode* merged = mergeTwoLists(a1, b1);

    cout << "Merged list: ";
    if (merged != nullptr) merged->display();

    freeList(merged);

    return 0;
}
