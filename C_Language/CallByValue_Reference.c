#include <stdio.h>

void CallbyValue(int a){
    a = a + 10;
    printf("Inside CallbyValue: a = %d\n", a);
}

void CallbyReference(int *a){
    *a = *a + 10;
    printf("Inside CallbyReference: a = %d\n", *a);
}

int main(){
    int x = 5, y = 5;

    printf("Before CallbyValue: x = %d\n", x);
    CallbyValue(x);
    printf("After CallbyValue: x = %d\n", x);

    printf("\nBefore CallbyReference: y = %d\n", y);
    CallbyReference(&y);
    printf("After CallbyReference: y = %d\n", y);

    return 0;
}
