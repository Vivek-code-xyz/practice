package mypack;

public class myage {
    short age;

    public myage(short a){
        if(a<0 || a>100){
            age = 0;
            System.out.println("Invalid age");
        }
        else{
            age = a;
        }
    }

    public void showAge(){
        System.out.println("Your age is : "+age);
    }
}
