#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define size 100

char stack[size];
int top=-1;

void push(char val){
    top++;
    stack[top]=val;
    return;
}

char pop(){
    return top==-1?'\0':stack[top--];
}

int isbalance(char exp[]){
    for(int i=0;i<strlen(exp);i++){
        char ch=exp[i];

        if(ch=='('){
            push(ch);
        }
        else if(ch==')'){
            if(pop()!='(') return 0;
        }
    }
    return (top==-1);
}


int main(){
    char exp[]="((a+b)*(c+d)))";
    int a = isbalance(exp);
    (a==1)?printf("This is valid expression") : printf("This is not a valid expresssion");
}