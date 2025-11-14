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

ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode *slow = head;
    ListNode *fast = head;
    for (int i = 1; i <= n; i++) {
        fast = fast->next;
    }
    if (fast == NULL) {
        head = head->next;
        return head;
    }
    while (fast->next != NULL) {
        slow = slow->next;
        fast = fast->next;
    }
    slow->next = slow->next->next;
    return head;
}

int main() {
    ListNode* head = new ListNode(10);
    head->next = new ListNode(20);
    head->next->next = new ListNode(30);
    head->next->next->next = new ListNode(40);
    head->next->next->next->next = new ListNode(50);

    cout << "Original list: ";
    head->display();

    int n = 2;
    head = removeNthFromEnd(head, n);

    cout << "List after removing " << n << "th node from end: ";
    head->display();

    while (head != nullptr) {          // free up head memory
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }

    return 0;
}
