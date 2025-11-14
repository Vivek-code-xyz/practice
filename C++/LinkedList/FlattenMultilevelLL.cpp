#include <iostream>
using namespace std;

class Node {
public:
    int val;
    Node* prev;
    Node* next;
    Node* child;
    Node(int _val) : val(_val), prev(nullptr), next(nullptr), child(nullptr) {}
};

// Your original flatten function unchanged
Node* flatten(Node* head) {
    Node *temp = head;
    while(temp){
        Node *a = temp->next;
        if(temp->child != nullptr){
            Node *c = temp->child;
            c = flatten(c);
            temp->next = c;
            c->prev = temp;
            temp->child = nullptr;
            while(c->next){
                c = c->next;
            }
            c->next = a;
            if(a) a->prev = c;
        }
        temp = a;
    }
    return head;
}

// Helper to print the flattened list
void printList(Node* head) {
    Node* temp = head;
    while(temp){
        cout << temp->val << " ";
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    // Constructing multilevel doubly linked list manually
    // Level 1: 1 - 2 - 3 - 4
    // Level 2:         7 - 8
    //                  |
    // Level 3:         11 - 12

    Node* n1 = new Node(1);
    Node* n2 = new Node(2);
    Node* n3 = new Node(3);
    Node* n4 = new Node(4);
    Node* n7 = new Node(7);
    Node* n8 = new Node(8);
    Node* n11 = new Node(11);
    Node* n12 = new Node(12);

    // Linking level 1
    n1->next = n2; n2->prev = n1;
    n2->next = n3; n3->prev = n2;
    n3->next = n4; n4->prev = n3;

    // Linking level 2 (child of 3)
    n3->child = n7;
    n7->next = n8; n8->prev = n7;

    // Linking level 3 (child of 8)
    n8->child = n11;
    n11->next = n12; n12->prev = n11;

    cout << "Original List (flattened view not printed since multilevel):" << endl;

    // Flatten
    Node* flatHead = flatten(n1);

    cout << "Flattened List:" << endl;
    printList(flatHead);  // Expected: 1 2 3 7 8 11 12 4

    return 0;
}
