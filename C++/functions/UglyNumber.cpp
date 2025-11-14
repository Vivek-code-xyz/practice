#include <iostream>
using namespace std;

bool isUgly(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    while (n % 3 == 0) n /= 3;
    while (n % 5 == 0) n /= 5;
    return (n == 1);
}

int main() {
    int testCases[] = {1, 6, 8, 14, 25, 0, -6, 30};

    for (int i = 0; i < sizeof(testCases) / sizeof(testCases[0]); ++i) {
        int n = testCases[i];
        cout << "isUgly(" << n << ") = " 
             << (isUgly(n) ? "true" : "false") << endl;
    }

    return 0;
}
