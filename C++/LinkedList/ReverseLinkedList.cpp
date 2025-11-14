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

ListNode* reverseList(ListNode* head) {
    ListNode *curr = head, *pre = NULL, *nxt = head;
    while (curr) {
        nxt = curr->next;
        curr->next = pre;
        pre = curr;
        curr = nxt;
    }
    return pre;
}

void freeList(ListNode* head) {
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Creating linked list: 1 -> 2 -> 3 -> 4 -> 5
    ListNode* node1 = new ListNode(1);
    ListNode* node2 = new ListNode(2);
    ListNode* node3 = new ListNode(3);
    ListNode* node4 = new ListNode(4);
    ListNode* node5 = new ListNode(5);

    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    cout << "Original list: ";
    node1->display();

    ListNode* reversed = reverseList(node1);

    cout << "Reversed list: ";
    reversed->display();

    freeList(reversed);
    return 0;
}
