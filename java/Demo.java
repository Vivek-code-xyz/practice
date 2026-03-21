import java.util.Scanner;

public class Demo {
    
    public static void main(String[] args) {
        int x;
        Scanner sc = new Scanner(System.in);
        x = sc.nextInt();

        switch (x) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("wednesDay");
                break;
            case 4:
                System.out.println("thursDay");
                break;
            case 5:
                System.out.println("friday");
                
                break;
            case 6:
                System.out.println("Saturday");
                
                break;
            case 7:
                System.out.println("Sunday");
                break;
            
            default:
                System.out.println("Invalid Day");

                break;
        }

    }
}
