#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Definition for singly-linked list node
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(NULL) {}
};

// Comparator for the min-heap
class compare {
public:
    bool operator()(Node* a, Node* b) {
        return a->data > b->data;
    }
};

class Solution {
public:
    Node* mergeKLists(vector<Node*>& arr) {
        priority_queue<Node*, vector<Node*>, compare> q;

        for (Node* node : arr) {
            if (node != NULL)
                q.push(node);
        }

        Node* dummy = new Node(0);
        Node* tail = dummy;

        while (!q.empty()) {
            Node* temp = q.top();
            q.pop();

            tail->next = temp;
            tail = tail->next;

            if (temp->next)
                q.push(temp->next);
        }

        return dummy->next;
    }
};

// Utility function to create linked list from vector
Node* createList(const vector<int>& vals) {
    Node* head = NULL;
    Node* tail = NULL;
    for (int val : vals) {
        Node* newNode = new Node(val);
        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = tail->next;
        }
    }
    return head;
}

// Utility function to print a linked list
void printList(Node* head) {
    while (head) {
        cout << head->data << " ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    // Create k sorted linked lists
    vector<Node*> arr;
    arr.push_back(createList({1, 4, 5}));
    arr.push_back(createList({1, 3, 4}));
    arr.push_back(createList({2, 6}));

    // Merge all lists
    Solution sol;
    Node* mergedHead = sol.mergeKLists(arr);

    // Print the result
    cout << "Merged Linked List: ";
    printList(mergedHead);

    return 0;
}
