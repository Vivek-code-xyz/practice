#include <iostream>
using namespace std;

class ListNode {
public:
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head;
    ListNode *fast = head;
    bool flag = false;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            flag = true;
            break;
        }
    }
    if (flag == false) return NULL;
    fast = head;
    while (fast != slow) {
        slow = slow->next;
        fast = fast->next;
    }
    return fast;
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
    // Create nodes
    ListNode* node1 = new ListNode(1);
    ListNode* node2 = new ListNode(2);
    ListNode* node3 = new ListNode(3);
    ListNode* node4 = new ListNode(4);
    ListNode* node5 = new ListNode(5);

    // Connect nodes: 1->2->3->4->5
    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    // Introduce cycle: 5->3
    node5->next = node3;

    ListNode* cycleStart = detectCycle(node1);

    if (cycleStart != NULL) {
        cout << "Cycle detected at node with value: " << cycleStart->val << endl;
    } else {
        cout << "No cycle detected." << endl;
        freeList(node1);
    }

    return 0;
}
