import java.util.Scanner;

public class newcla {

    static boolean checkAge(int num){
        if(num <18){
            return false;
        }
        return true;
    }
   
    public static void main(String[] args) {
        System.out.println("Enter your age : ");
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();

        if(checkAge(a)){
            System.out.println("You can Vote");
        }
        else{
            System.out.println("You can not Vote");
        }
    }
}

 