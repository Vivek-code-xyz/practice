import java.util.Scanner;
import java.util.*;

class MyProgram {

    public static void main(String[] args){
        int x;
        Scanner sc = new Scanner(System.in);
        x = sc.nextInt();

        if(x > 0){
            System.out.println("Number is positve");
        }
        else{
            System.out.println("Number is negetive");
        }
    }
}