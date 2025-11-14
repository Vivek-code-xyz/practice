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

ListNode* oddEvenList(ListNode* head) {
    ListNode* lo = new ListNode(1);
    ListNode* hi = new ListNode(10);
    ListNode* lotemp = lo;
    ListNode* hitemp = hi;
    ListNode* temp = head;
    int x = 1;
    while (temp != NULL) {
        if (x % 2 == 1) {
            lotemp->next = temp;
            temp = temp->next;
            lotemp = lotemp->next;
            x++;
        }
        else {
            hitemp->next = temp;
            temp = temp->next;
            hitemp = hitemp->next;
            x++;
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
    // Input: 1 -> 2 -> 3 -> 4 -> 5
    ListNode* head = new ListNode(1);
    ListNode* node2 = new ListNode(2);
    ListNode* node3 = new ListNode(3);
    ListNode* node4 = new ListNode(4);
    ListNode* node5 = new ListNode(5);
    head->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    cout << "Original list: ";
    head->display();

    ListNode* result = oddEvenList(head);

    cout << "After oddEvenList: ";
    result->display();

    freeList(result);
    return 0;
}
