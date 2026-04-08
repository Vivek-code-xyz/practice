public class copyconst {
    public static void main(String[] args) {
        copyex a = new copyex();
        copyex b = new copyex(a);

        System.out.println(b.name);
    }
}

class copyex{
    String name;

    copyex(){
        name = "Vivek";
    }

    copyex(copyex a){
        this.name = a.name;
    }
}
