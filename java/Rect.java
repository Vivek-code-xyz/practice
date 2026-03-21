import java.util.Scanner;

public class Rect {
    
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        System.out.println("Enter Height of the Rectangle : ");
        Scanner sc = new Scanner(System.in);
        r1.h= sc.nextFloat();
        System.out.println("Enter Widht of the Rectangle");
        r1.w = sc.nextFloat();

        System.out.println("Area of rectangle is : "+r1.area());


    }

    
}


class Rectangle{
        float h;
        float w;

        public float area(){
            return h*w;
        }
    } 