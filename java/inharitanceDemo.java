public class inharitanceDemo {

    public static void main(String[] args) {
        B var = new B();

        System.out.println(var.a);

    }
    
}


class A{
    protected int a=8;
    public int b = 9;
    private int c = 10;
}


class B extends A{
   int adf = 100;
}