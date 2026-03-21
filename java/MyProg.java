import java.util.*;


public class MyProg {
    public static void main(String[] args) {
        int x;
        Scanner sc = new Scanner(System.in);
        x = sc.nextInt();

        if(x > 0){
            System.out.println("Number is positive");
        }else if(x<0){
            System.out.println("Number is negetive");
        }else {
            System.out.println("Number is zero");
        }
    }
}
