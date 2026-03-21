import java.util.Scanner;

public class continues {
    public static void main(String[] args) {
        int x,n;
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter No of Values to Sum");

        n  = sc.nextInt();
        int sum=0;
        for(int i=0;i<n;i++){
            System.out.println("Enter the Number  "+i+" : ");
            x = sc.nextInt();

            if(x<0){
                continue;
            }
            sum+=x;




        }
        System.out.println("Sum : "+sum);






    }
}
