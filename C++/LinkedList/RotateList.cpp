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

ListNode* rotateRight(ListNode* head, int k) {
    if (head == NULL || head->next == NULL) return head;
    ListNode* t = head;
    int n = 1;
    while (t->next != NULL) {
        n++;
        t = t->next;
    }
    ListNode* tail = t;
    t = head;
    k = k % n;
    if (k == 0) return head;

    for (int i = 1; i < n - k; i++) {
        t = t->next;
    }
    ListNode* newhead = t->next;

    tail->next = head;
    t->next = NULL;
    return newhead;
}

void freeList(ListNode* head) {
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Create nodes: 1->2->3->4->5
    ListNode* n1 = new ListNode(1);
    ListNode* n2 = new ListNode(2);
    ListNode* n3 = new ListNode(3);
    ListNode* n4 = new ListNode(4);
    ListNode* n5 = new ListNode(5);

    n1->next = n2;
    n2->next = n3;
    n3->next = n4;
    n4->next = n5;

    cout << "Original list: ";
    n1->display();

    int k = 2;
    ListNode* rotatedHead = rotateRight(n1, k);

    cout << "List after rotating right by " << k << ": ";
    if (rotatedHead != nullptr) rotatedHead->display();

    freeList(rotatedHead);

    return 0;
}
