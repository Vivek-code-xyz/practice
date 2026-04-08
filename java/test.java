import java.util.Scanner;

public class test {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int ip;
        do{
            System.out.println("Enter the Value of Ip (1-30): ");
            ip = sc.nextInt();
        }while(!(ip < 31 && ip>1));

        System.out.println("Finaly got what i asked");

    }
    
}