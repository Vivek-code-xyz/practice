public class check {

   

    public static void main(String[] args) {
        A  obj =  new A();

        A[] array = new A[5];

        array[2] = new A(4);
        array[3] = new A(-1);
        array[0]= new A(9);
        array[4] = new A();
        array[1] = new A(23);

        for (A jb : array){
            jb.display();
        }


        A obj2 = obj;

        obj2.increment();
        obj.display();
    }


}


 class A {
    int num  ;

    A(){
        this(0);
    }

    A(int n){
        num = n;
    }
    void increment () {
        num ++ ;
    }

    void display(){
        System.out.println(num);
    }}