public class java1 {
    public static void main(String[] args) {
        Cube c1 = new Cube(34,45,21) ;
        System.out.println(c1.calArea());
      
    }
}

class Cube {
    float h;
    float w;
    float b;

    Cube(float ht, float wt, float bt){
        this.h = ht;
       this.w = wt;
        b = bt;
    }

    float calArea() {
       
        return h * w * b;
    }
}