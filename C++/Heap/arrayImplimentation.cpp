#include<iostream>
using namespace std;


class heap{
    int *arr;
    int s;          //current size of heap
    int size;       // total space allocated to heap

    public:
    heap(int x){
        arr=new int [x];  //allocate x space
        s=0;
        size=x;
    }

    void insert(int n){
        if(s==size){
            cout<<"Heap is full!"<<endl;
            return;
        }

        arr[s]=n;
        int i=s;        // i stores current index of inserted element (for comparison)
        s++;            //updating the size


        while(i>0 && arr[i]> arr[(i-1)/2]){
            swap(arr[i],arr[(i-1)/2]);
        }

        cout<<n<<" is inserted successfully!"<<endl;
        return;
    }

    void heapify(int i){
        int left= 2*i + 1;
        int right= 2*i + 2;
        int largest=i;

        if(left<s && arr[left]>arr[largest]) largest=left;
        if(right<s && arr[right]> arr[largest]) largest =right;

        if(largest!=i){
            swap(arr[i],arr[largest]);
            heapify(largest);
        }
        
        return;
    }

    void deletehead(){
        if(s==0){
            cout<<"Heap is empty!"<<endl;
            return;
        }

        arr[0]=arr[s-1];
        s--;
        cout<<"head is deleted succuessfully!"<<endl;
        heapify(0);
    }

    void display(){
        for(int i=0;i<s;i++){
            cout<<arr[i]<<" ";
        }
        cout<<endl;
    }

    int Size(){
        return s;
    }
    int capacity(){
        return size;
    }
};


int main(){

    heap h(7);
    h.insert(90);
    h.insert(45);
    h.insert(18);
    h.insert(27);
    h.insert(90);
    h.insert(34);
    h.insert(21);
    h.deletehead();
    h.insert(8);
    h.display();
    cout<<"size of heap is : "<<h.Size()<<endl;
    cout<<"capacity of heap is : "<<h.capacity()<<endl;
}