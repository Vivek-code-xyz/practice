#include <stdio.h>

typedef struct {
    int min;
    int max;
}MinMax;

MinMax func (int arr[] , int st,int end){
    MinMax res;
    if(st == end){
        res.max = arr[st];
        res.min = arr[end];
        return res;
    }

    if(st+1 == end){
        if(arr[st]>arr[end]){
            res.max  = arr[st];
            res.min = arr[end];
        }
        else{
            res.max  = arr[end];
            res.min = arr[st];
        }
        return res;
    }

    MinMax Lres,Rres;

    int mid = st + (end-st)/2;

    Lres = func(arr,st,mid);
    Rres = func(arr,mid+1,end);

    res.max = (Lres.max > Rres.max)?Lres.max:Rres.max;
    res.min = (Lres.min < Rres.min)?Lres.min:Rres.min;


    return res;
}


int main(){

    int arr1[] = {15, 3, 28, 7, 42, 11, 35, 2, 19, 50};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    MinMax result1 = func(arr1, 0, n1 - 1);
    printf("Array 1: ");
    for (int i = 0; i < n1; i++)
        printf("%d ", arr1[i]);
    printf("\nMaximum: %d, Minimum: %d\n\n", result1.max, result1.min);
    return 0;
}