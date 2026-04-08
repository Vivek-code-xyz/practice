class Parent {
    final void criticalMethod() {
        System.out.println("This method cannot be overridden");
    }
}
class Child extends Parent {
    // This will cause a COMPILATION ERROR
    // void criticalMethod() {
    //     System.out.println("Cannot override");
    // }
}
public class parent {
    public static void main(String[] args) {
        Child child = new Child();
        child.criticalMethod();
    }
}