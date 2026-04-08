import java.util.*;

public class cll{
    public static void main(String[] args) {
        Vector <String> a = new Vector<>();

        a.add("Vivek");
        a.add("khasiya");
        a.add("this is iteratable");
        // a.addFirst("this is lined liste");

        // System.out.println(a);

        // for(String name : a){
        //     System.out.println(name);
        // }

        Stack<Integer> st = new Stack<>();

        st.add(12);
        st.push(23);
        st.pop();
        st.remove(0);

        System.out.println(st);
    }
}