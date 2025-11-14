#include <iostream>
#include <vector>
#include <string>
using namespace std;

void dfs(int node, vector<vector<int>> &adj, vector<int> &visited) {
    visited[node] = 1;
    for (int i = 0; i < adj[node].size(); i++) {
        if (visited[adj[node][i]] == 0) {
            dfs(adj[node][i], adj, visited);
        }
    }
}

int isCircle(vector<string> &arr) {
    int n = arr.size();
    vector<vector<int>> adj(26);

    vector<int> indeg(26, 0);
    vector<int> outdeg(26, 0);

    for (int i = 0; i < n; i++) {
        string temp = arr[i];
        int u = temp[0] - 'a';
        int v = temp[temp.size() - 1] - 'a';
        adj[u].push_back(v);
        outdeg[u]++;
        indeg[v]++;
    }

    for (int i = 0; i < 26; i++) {
        if (indeg[i] != outdeg[i]) return 0;
    }

    vector<int> visited(26, 0);
    dfs(arr[0][0] - 'a', adj, visited);

    for (int i = 0; i < 26; i++) {
        if (indeg[i] && !visited[i]) {
            return 0;
        }
    }

    return 1;
}

int main() {
    vector<vector<string>> testCases = {
        {"abc", "cde", "efa"},        // Circle (a->c->e->a)
        {"ab", "bc", "cd", "da"},     // Circle
        {"ab", "bc", "cd"},           // No circle
        {"aa", "aa", "aa"},           // Circle
        {"ab", "bb", "ba"},           // Circle
        {"ab", "bc", "cd", "df"}      // No circle
    };

    for (size_t i = 0; i < testCases.size(); i++) {
        cout << "Test case " << i + 1 << ": ";
        int ans = isCircle(testCases[i]);
        if (ans)
            cout << "Circle can be formed\n";
        else
            cout << "Circle cannot be formed\n";
    }

    return 0;
}
