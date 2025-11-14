#include <iostream>
#include <vector>
#include <iomanip> // for setw
using namespace std;

void floydWarshall(vector<vector<int>> &dist) {
    int n = dist.size();
    
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] == 1e8 || dist[k][j] == 1e8) continue;
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}

int main() {
    const int INF = 1e8;
    // Hardcoded graph with 4 vertices
    // Graph:
    // 0 -> 1 (5)
    // 0 -> 3 (10)
    // 1 -> 2 (3)
    // 2 -> 3 (1)
    
    vector<vector<int>> dist = {
        {0,   5, INF, 10},
        {INF, 0,   3, INF},
        {INF, INF, 0,   1},
        {INF, INF, INF, 0}
    };

    floydWarshall(dist);

    cout << "All-pairs shortest paths:\n";
    for (int i = 0; i < dist.size(); i++) {
        for (int j = 0; j < dist.size(); j++) {
            if (dist[i][j] == INF)
                cout << setw(5) << "INF";
            else
                cout << setw(5) << dist[i][j];
        }
        cout << "\n";
    }

    return 0;
}
