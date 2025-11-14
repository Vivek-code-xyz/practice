#include <iostream>
using namespace std;

// Definition of singly-linked list node
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

// Your original function to find the intersection node
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode* tempA = headA;
    ListNode* tempB = headB;
    int lenA = 0;
    int lenB = 0;

    // Calculate the lengths of both lists
    while (tempA != NULL) {
        lenA++;
        tempA = tempA->next;
    }
    while (tempB != NULL) {
        lenB++;
        tempB = tempB->next;
    }

    // Reset pointers
    tempA = headA;
    tempB = headB;

    // Advance the pointer of the longer list by the length difference
    if (lenA > lenB) {
        for (int i = 1; i <= lenA - lenB; i++) {
            tempA = tempA->next;
        }
    } else {
        for (int i = 1; i <= lenB - lenA; i++) {
            tempB = tempB->next;
        }
    }

    // Move both pointers together until they meet
    while (tempA != tempB) {
        tempA = tempA->next;
        tempB = tempB->next;
    }

    return tempA;
}

// Function to free memory of a list (stopping before shared/intersecting nodes)
void freeList(ListNode* head, ListNode* stopAt = nullptr) {
    while (head != stopAt) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}

int main() {
    // Common part: 30 -> 40 -> 50
    ListNode* intersect = new ListNode(30);
    intersect->next = new ListNode(40);
    intersect->next->next = new ListNode(50);

    // First list: 10 -> 20 -> [30 -> 40 -> 50]
    ListNode* headA = new ListNode(10);
    headA->next = new ListNode(20);
    headA->next->next = intersect;

    // Second list: 15 -> [30 -> 40 -> 50]
    ListNode* headB = new ListNode(15);
    headB->next = intersect;

    cout << "List A: ";
    headA->display();

    cout << "List B: ";
    headB->display();

    ListNode* intersectionNode = getIntersectionNode(headA, headB);

    if (intersectionNode) {
        cout << "Intersection at node with value: " << intersectionNode->val << endl;
    } else {
        cout << "No intersection found." << endl;
    }

    // Free memory
    freeList(headA, intersect);
    freeList(headB, intersect);
    freeList(intersect);

    return 0;
}
