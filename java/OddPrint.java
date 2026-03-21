import java.util.Scanner;

public class OddPrint {
    public static void main(String[] args) {
        int n;
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();

        int i = 1;
        while(i<=n){
           if(n%i == 0){
            System.out.print(i+",");
           }
           i++;
        }
    }
}
