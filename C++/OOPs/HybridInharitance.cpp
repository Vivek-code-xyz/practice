#include <iostream>
#include <string>
using namespace std;

// Base class
class student {
protected:
    string name;
    int roll;

public:
    student(string n, int r) {
        name = n;
        roll = r;
    }

    void showStudent() {
        cout << "Name: " << name << ", Roll: " << roll << endl;
    }
};

// Derived from student
class boy : public student {
public:
    boy(string n, int r) : student(n, r) {}

    void isBoy() {
        cout << name << " is a boy." << endl;
    }
};

// Derived from student
class girl : public student {
public:
    girl(string n, int r) : student(n, r) {}

    void isGirl() {
        cout << name << " is a girl." << endl;
    }
};

// Derived from boy
class male : public boy {
public:
    male(string n, int r) : boy(n, r) {}

    void showGender() {
        cout << name << " is male." << endl;
    }
};

// Derived from girl
class female : public girl {
public:
    female(string n, int r) : girl(n, r) {}

    void showGender() {
        cout << name << " is female." << endl;
    }
};

int main() {
    male m("Amit", 101);
    m.showStudent();
    m.isBoy();
    m.showGender();

    cout << "------------------" << endl;

    female f("Riya", 102);
    f.showStudent();
    f.isGirl();
    f.showGender();

    return 0;
}
