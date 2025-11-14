#include <iostream>
using namespace std;

// Definition for singly-linked list node
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

// Your original function (unchanged)
void deleteNode(ListNode* tar) {
    tar->val = tar->next->val;
    tar->next = tar->next->next;
}

int main() {
    // Creating linked list: 10 -> 20 -> 30 -> 40
    ListNode* head = new ListNode(10);
    head->next = new ListNode(20);
    head->next->next = new ListNode(30);
    head->next->next->next = new ListNode(40);

    cout << "Original list: ";
    head->display();

    
    ListNode* target = head->next->next; 
    deleteNode(target); 
    cout << "List after deleting 3rd node : ";
    head->display();


    return 0;
}
