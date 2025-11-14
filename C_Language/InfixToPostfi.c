#include <stdio.h>
#include <ctype.h>

#define SIZE 50

char stack[SIZE];
int top = -1;

void push(char c){
    stack[++top] = c;
}

char pop(){
    return stack[top--];
}

int prec(char c){
    if(c=='^') return 3;
    if(c=='*' || c=='/') return 2;
    if(c=='+' || c=='-') return 1;
    return 0;
}

int main(){
    char infix[50], postfix[50];
    int i=0,j=0;
    char ch;

    printf("Enter infix: ");
    scanf("%s", infix);

    while(infix[i] != '\0'){
        ch = infix[i];
        if(isalnum(ch)){
            postfix[j++] = ch;
        }
        else if(ch=='('){
            push(ch);
        }
        else if(ch==')'){
            while(top!=-1 && stack[top]!='('){
                postfix[j++] = pop();
            }
            pop();
        }
        else{
            while(top!=-1 && prec(stack[top]) >= prec(ch)){
                postfix[j++] = pop();
            }
            push(ch);
        }
        i++;
    }

    while(top!=-1){
        postfix[j++] = pop();
    }

    postfix[j] = '\0';
    printf("Postfix: %s\n", postfix);

    return 0;
}
