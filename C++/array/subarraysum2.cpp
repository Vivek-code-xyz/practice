// kadane's algorithm

#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "enter size of array:";
    cin>>n;
    int arr[n];
    cout << "enter elements one by one :\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int  msum = INT16_MIN;
    int sum=0;
    for (int i = 0; i < n; i++)
    {
        
            sum += arr[i];
            msum = max(msum, sum);
            if(sum<0) sum =0;
        
    }
    cout<<"maximum possible sum of subarray = "<<msum;
    return 0;
}