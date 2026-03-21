public class copyconstructur {
    public static void main(String[] args) {
        student s1  = new student ("Vivek",23);

        student s2 = new student(s1);
        System.out.println(s2.name);
        s2.name = "karan";
        
        System.out.println(s2.name);
        System.out.println(s1.name);
    }
}

class student{
    String name;
    int rollNo;

    student(String nm,int rn){
        this.name = nm;
        this.rollNo = rn;
    }

    // copy constructor
    student(student s1){
        this.name  = s1.name;
        this.rollNo = s1.rollNo;
    }
}