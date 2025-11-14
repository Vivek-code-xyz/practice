#include <stdio.h>

void add(int a[10][10], int b[10][10], int r, int c){
    int i,j;
    printf("\nAddition result:\n");
    for(i=0;i<r;i++){
        for(j=0;j<c;j++){
            printf("%d ", a[i][j] + b[i][j]);
        }
        printf("\n");
    }
}

void sub(int a[10][10], int b[10][10], int r, int c){
    int i,j;
    printf("\nSubtraction result:\n");
    for(i=0;i<r;i++){
        for(j=0;j<c;j++){
            printf("%d ", a[i][j] - b[i][j]);
        }
        printf("\n");
    }
}

void mul(int a[10][10], int b[10][10], int r1, int c1, int c2){
    int i,j,k;
    int res[10][10];
    for(i=0;i<r1;i++){
        for(j=0;j<c2;j++){
            res[i][j]=0;
            for(k=0;k<c1;k++){
                res[i][j]+=a[i][k]*b[k][j];
            }
        }
    }
    printf("\nMultiplication result:\n");
    for(i=0;i<r1;i++){
        for(j=0;j<c2;j++){
            printf("%d ", res[i][j]);
        }
        printf("\n");
    }
}

int main(){
    int a[10][10], b[10][10];
    int r1,c1,r2,c2;
    int ch,i,j;

    printf("1.Addition\n2.Subtraction\n3.Multiplication\n");
    printf("Enter choice: ");
    scanf("%d",&ch);

    if(ch==3){
        printf("Enter rows and cols of first matrix: ");
        scanf("%d%d",&r1,&c1);
        printf("Enter rows and cols of second matrix: ");
        scanf("%d%d",&r2,&c2);
        if(c1!=r2){
            printf("Multiplication not possible\n");
            return 0;
        }
    } else {
        printf("Enter rows and cols of matrices: ");
        scanf("%d%d",&r1,&c1);
        r2=r1; c2=c1;
    }

    printf("Enter first matrix:\n");
    for(i=0;i<r1;i++){
        for(j=0;j<c1;j++){
            scanf("%d",&a[i][j]);
        }
    }

    printf("Enter second matrix:\n");
    for(i=0;i<r2;i++){
        for(j=0;j<c2;j++){
            scanf("%d",&b[i][j]);
        }
    }

    if(ch==1){
        add(a,b,r1,c1);
    }
    else if(ch==2){
        sub(a,b,r1,c1);
    }
    else if(ch==3){
        mul(a,b,r1,c1,c2);
    }
    else{
        printf("Invalid choice\n");
    }

    return 0;
}
