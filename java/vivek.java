public class vivek {
    
    public static void main(String[] args) {
        
        akela a = new akela();
        a.gtu();
    }
}

class akela implements abc{
    public void gtu(){
        System.out.println("dark future");
    }
    public int marks(){
        return 12;
    }

    void show(){
        System.out.println(age);
    }
}

abstract class animal {
    int a = 9;
    abstract void sound();

    void sleep(){
        System.out.println("animal is sleeping");
    }
    
}

class dog extends animal{
    void sound(){
        System.out.println("bhau bhau");
    }

    void eat(){
        System.out.println("dogesh bhai");
    }
}

class cat extends animal{
    void sound(){
        System.out.println("meau meau");
    }

    void eat(){
        System.out.println("billi");
    }
}


 interface abc{
    int age =96;
    void gtu();
    int marks();
    
}