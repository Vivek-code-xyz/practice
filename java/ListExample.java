import java.util.ArrayList;
public class ListExample {
    public static void main(String[] args) {
        // ArrayList - dynamic array implementation
        ArrayList <String> list = new ArrayList<>();
        
        // Add elements
        list.add("Apple");
        list.add("Banana");
        list.add("Orange");
        list.add("Apple");  // Duplicates allowed
        
        // Access elements
        System.out.println("List: " + list);
        System.out.println("First element: " + list.get(0));
        System.out.println("Size: " + list.size());
        
        // Remove elements
        list.remove(1);  // Remove by index
        list.remove("Apple");  // Remove first occurrence
        
        System.out.println("After removal: " + list);
        
        // Iterate through list
        for (String fruit : list) {
            System.out.println(fruit);
        }
    }
}
