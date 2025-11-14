#include <iostream>
using namespace std;

class ListNode {
public:
    int val;
    ListNode* next;

    ListNode(int x) : val(x), next(nullptr) {}

    void display(int limit = 20) {
        ListNode* temp = this;
        int count = 0;
        while (temp != nullptr && count < limit) {
            cout << temp->val << " ";
            temp = temp->next;
            count++;
        }
        if (count == limit) {
            cout << "... (possible cycle)";
        }
        cout << endl;
    }
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}

void freeList(ListNode* head, int limit = 100) {
    int count = 0;
    while (head != nullptr && count < limit) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
        count++;
    }
}

int main() {
    // Create nodes separately
    ListNode* node1 = new ListNode(1);
    ListNode* node2 = new ListNode(2);
    ListNode* node3 = new ListNode(3);
    ListNode* node4 = new ListNode(4);
    ListNode* node5 = new ListNode(5);

    // Connect nodes: 1 -> 2 -> 3 -> 4 -> 5
    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    // Introduce a cycle: 5 -> 3
    node5->next = node3;
    

    if (hasCycle(node1)) {
        cout << "Cycle detected in the list." << endl;
    } else {
        cout << "No cycle detected." << endl;
        node1->display();
        freeList(node1);
    }

    return 0;
}
