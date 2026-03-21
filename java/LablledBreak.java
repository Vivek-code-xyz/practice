import java.util.Scanner;

public class LablledBreak {
   public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n=  sc.nextInt();

        outerlooop : for (int i=0;i<n;i++){
            for(int j=0;j<=i;j++){

                if(j == 7){
                    System.out.println("Pattern is limited to base 7 only");
                    break outerlooop;
                }
                System.out.print("#");


            }
            System.out.println();
        }
   } 
}
