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

ListNode* partition(ListNode* head, int x) {
    ListNode* lo = new ListNode(1);
    ListNode* hi = new ListNode(10);
    ListNode* lotemp = lo;
    ListNode* hitemp = hi;
    ListNode* temp = head;
    while (temp != NULL) {
        if (temp->val < x) {
            lotemp->next = temp;
            temp = temp->next;
            lotemp = lotemp->next;
        }
        else {
            hitemp->next = temp;
            temp = temp->next;
            hitemp = hitemp->next;
        }
    }
    lotemp->next = hi->next;
    hitemp->next = NULL;
    return lo->next;
}

void freeList(ListNode* head) {
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Test list: 1 -> 4 -> 3 -> 2 -> 5 -> 2
    ListNode* head = new ListNode(1);
    ListNode* node2 = new ListNode(4);
    ListNode* node3 = new ListNode(3);
    ListNode* node4 = new ListNode(2);
    ListNode* node5 = new ListNode(5);
    ListNode* node6 = new ListNode(2);
    head->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;
    node5->next = node6;

    cout << "Original list: ";
    head->display();

    ListNode* result = partition(head, 3);

    cout << "Partitioned list (x = 3): ";
    result->display();

    freeList(result);
    return 0;
}
