#include <iostream>
#include <vector>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

// Function to split list into k parts
vector<ListNode*> splitListToParts(ListNode* head, int k) {
    int n = 0;
    ListNode* temp = head;
    while (temp) {
        n++;
        temp = temp->next;
    }

    vector<ListNode*> ans(k, NULL);
    int size = n / k;
    int rem = n % k;

    temp = head;
    for (int i = 0; i < k && temp; ++i) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int partSize = size + (rem-- > 0 ? 1 : 0);

        for (int j = 0; j < partSize && temp; ++j) {
            curr->next = temp;
            temp = temp->next;
            curr = curr->next;
        }
        curr->next = NULL;
        ans[i] = dummy->next;
    }

    return ans;
}

// Helper function to print list
void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << " -> ";
        head = head->next;
    }
    cout << endl;
}

// Helper function to print vector of linked lists
void printParts(const vector<ListNode*>& parts) {
    for (int i = 0; i < parts.size(); ++i) {
        cout << "Part " << i + 1 << ": ";
        printList(parts[i]);
    }
}

int main() {
    // Create linked list 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
    ListNode* head = new ListNode(1);
    ListNode* temp = head;
    for (int i = 2; i <= 10; ++i) {
        temp->next = new ListNode(i);
        temp = temp->next;
    }

    int k = 3;
    cout << "Original list:\n";
    printList(head);

    vector<ListNode*> parts = splitListToParts(head, k);

    cout << "\nSplit into " << k << " parts:\n";
    printParts(parts);

    return 0;
}
