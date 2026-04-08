#include <stdio.h>

void merge (int arr[],int l,int m,int r){
    int i,j,k;

    int n1 = m+1-l;
    int n2 = r-m;

    int temp1[n1];
    for(int i = 0;i<n1;i++){
        temp1[i] = arr[l+i];
    }

    int temp2[n2];

    for(int j=0;j<n2;j++){
        temp2[j] = arr[m+1+j];
    }

    i=0;j=0 ;k=l;

    while(i< n1 && j<n2){
        if(temp1[i]<temp2[j]){
            arr[k++] = temp1[i++];
        }else{
            arr[k++] = temp2[j++];
        }
    }

    while(i<n1){
        arr[k++] = temp1[i++];
    }
    while(j<n2){
        arr[k++]= temp2[j++];
    }
}

void mergeSort (int arr[], int l,int r){
    if(l<r){

        int mid = l+ (r-l)/2;

        mergeSort(arr,l,mid);
        mergeSort(arr,mid+1,r);

        merge(arr,l,mid,r);
    }

    
}


void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

int main(){
    // Test Case 1: Unsorted array
    int arr1[] = {38, 27, 43, 3, 9, 82, 10};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    printf("Original Array 1: ");
    printArray(arr1, n1);
    mergeSort(arr1, 0, n1 - 1);
    printf("Sorted Array 1:   ");
    printArray(arr1, n1);
    printf("\n");
}