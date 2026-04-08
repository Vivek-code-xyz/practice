

public class mainclass {

    public static void main(String[] args) {
       animal a = new animal();
       
       if(a instanceof dog){
         dog b = (dog) a;
         b.eat();
       }else{
        System.out.println("Obejct type is not instance of dog its animal");
       }
    }
}

class animal{
     static void sound(){
        System.out.println("animal ka sound");
    }
}

class dog extends animal{
   static void sound(){
        // super.sound();
        System.out.println("dog ka sound");
    }

    void eat(){
        System.out.println("Dog eats meat");
    }
}