#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int _val) {
        val = _val;
        next = nullptr;
        random = nullptr;
    }
};

// Your original function, unchanged
Node* copyRandomList(Node* head) {
    //deep copy
    Node *c=new Node(100);
    Node *temp=head;
    Node *tc=c;
    while(temp){
        Node *a=new Node(temp->val);
        tc->next=a;
        tc=tc->next;
        temp=temp->next;
    }
    // alternate connections
    Node *a=head;
    Node *b=c->next;
    Node *dum= new Node(13);
    tc=dum;
    while(a){

        tc->next=a;
        a=a->next;
        tc=tc->next;

        tc->next=b;
        b=b->next;
        tc=tc->next;
    }
    dum=dum->next;
    //assigning random conections;
    a=dum;
    while(a){
       Node * b=a->next;
        if(a->random) b->random=a->random->next;
        a=a->next->next;
    }

    //separating the list
    Node *d1=new Node(90);
    Node *d2=new Node(80);
    a=d1;
    b=d2;
    tc=dum;
    while(tc){
        a->next=tc;
        tc=tc->next;
        a=a->next;

        b->next=tc;
        tc=tc->next;
        b=b->next;
    }
    a->next=nullptr;
    b->next=nullptr;
    d1=d1->next;
    d2=d2->next;
    return d2;
}

// Helper to print list and random pointers
void printList(Node* head) {
    Node* temp = head;
    while (temp) {
        cout << "Val: " << temp->val << ", Random: ";
        if (temp->random)
            cout << temp->random->val;
        else
            cout << "NULL";
        cout << endl;
        temp = temp->next;
    }
}

// Helper to create a list from vector of values
Node* createList(const vector<int>& vals) {
    if (vals.empty()) return nullptr;
    Node* head = new Node(vals[0]);
    Node* temp = head;
    for (size_t i = 1; i < vals.size(); i++) {
        temp->next = new Node(vals[i]);
        temp = temp->next;
    }
    return head;
}

int main() {
    // Create nodes manually to set random pointers
    Node* n1 = new Node(1);
    Node* n2 = new Node(2);
    Node* n3 = new Node(3);

    n1->next = n2;
    n2->next = n3;

    // Setting random pointers:
    n1->random = n3; // 1 -> 3
    n2->random = n1; // 2 -> 1
    n3->random = n2; // 3 -> 2

    cout << "Original List:\n";
    printList(n1);

    Node* copied = copyRandomList(n1);

    cout << "\nCopied List:\n";
    printList(copied);

    return 0;
}
