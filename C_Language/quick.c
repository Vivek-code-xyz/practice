#include <stdio.h>

void swap(int *a,int *b){
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[],int low,int high){
    int pivot = arr[high];
    int i = low - 1;

    for(int j=low;j<high;j++){
        if(arr[j] < pivot){
            i++;
            swap(&arr[j],&arr[i]);
        }
    }

    swap(&arr[i+1],&arr[high]);
    return i+1;

}


int medianOfThree(int arr[], int low, int high) {
    int mid = low + (high - low) / 2;
    
    // Find median of arr[low], arr[mid], arr[high]
    if (arr[low] > arr[mid])
        swap(&arr[low], &arr[mid]);
    if (arr[low] > arr[high])
        swap(&arr[low], &arr[high]);
    if (arr[mid] > arr[high])
        swap(&arr[mid], &arr[high]);
    
    // Now arr[mid] is the median, swap it with arr[high] for partition
    swap(&arr[mid], &arr[high]);
    return high;
}   

int patitionwithmedianofthree(int arr[],int l,int r){

}


void quicksort ( int arr[],int l,int h){
    if(l<h){
        int pi;
        pi = partition(arr,l,h);
        quicksort(arr,l,pi-1);
        quicksort(arr,pi+1,h);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
}


int main(){
    int arr1[] = {10, 7, 8, 9, 1, 5, 23, 15, 3};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    printf("Original Array 1: ");
    printArray(arr1, n1);
    quicksort(arr1, 0, n1 - 1);  // Standard pivot
    printf("Sorted Array 1:   ");
    printArray(arr1, n1);
    printf("\n");
}