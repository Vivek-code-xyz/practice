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

ListNode* deleteDuplicates(ListNode* head) {
    if(head == NULL || head->next == NULL) return head;
    ListNode *a = head;
    ListNode *b = head->next;

    while(b != NULL){
        while(b != NULL && b->val == a->val) b = b->next;
        a->next = b;
        a = b;
        if(b != NULL) b = b->next;
    }
    return head;
}

void freeList(ListNode* head) {
    while(head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Create nodes with duplicates: 1->1->2->3->3->4->4->5
    ListNode* n1 = new ListNode(1);
    ListNode* n2 = new ListNode(1);
    ListNode* n3 = new ListNode(2);
    ListNode* n4 = new ListNode(3);
    ListNode* n5 = new ListNode(3);
    ListNode* n6 = new ListNode(4);
    ListNode* n7 = new ListNode(4);
    ListNode* n8 = new ListNode(5);

    // Link nodes
    n1->next = n2;
    n2->next = n3;
    n3->next = n4;
    n4->next = n5;
    n5->next = n6;
    n6->next = n7;
    n7->next = n8;

    cout << "Original list: ";
    n1->display();

    ListNode* head = deleteDuplicates(n1);

    cout << "List after removing duplicates: ";
    if (head != nullptr) head->display();

    freeList(head);
    return 0;
}
