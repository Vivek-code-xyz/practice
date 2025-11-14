#include<stdio.h>

#define size 25

typedef struct{
    int arr[size];
    int top;
}Stack;


void initialise(Stack *s){
    s->top=-1;
}

int isfull(Stack *s){
    return s->top==size-1;
}

int isempty(Stack *s){
    return s->top==-1;
}

void push(Stack *s,int x){
    if(isfull(s)){
        printf("The Stack is Full...\n");
        return;
    }
    s->arr[++s->top]=x;
}

void pop(Stack*s){
    if(isempty(s)){
        printf("The Stack is empty...\n");
        return;
    }
    s->top--;
}

int top(Stack *s){
    if(isempty(s)){
        printf("The Stack is empty...\n");
        return -1;
    }
    return s->arr[s->top];
}

void display(Stack *s){
    if(isempty(s)){
        printf("The Stack is empty...\n");
        return ;
    }
    printf("Elements present in stack are : ");
    for(int i=s->top;i>=0;i--){
        printf("%d ",s->arr[i]);
    }
    printf("\n");
}

int main(){
    Stack s;
    int ch, val;
    initialise(&s);

    while(1){
        printf("Choose operation on stack : ");
        printf("\n1.Push\n2.Pop\n3.Display\n4.Top element\n5.Exit\n");
        printf("Enter choice: ");
        scanf("%d",&ch);

        if(ch==1){
            printf("Enter value: ");
            scanf("%d",&val);
            push(&s,val);
        }
        else if(ch==2){
            pop(&s);
        }
        else if(ch==3){
            display(&s);
        }
        else if(ch==4){
            printf("Top element: %d\n", top(&s));
        }
        else if(ch==5){
            break;
        }
        else{
            printf("Wrong choice!!\n");
        }
    }

    return 0;
}
