class clas{
    public static void main(String[] args) {
        student abc = new student();

        System.out.println(abc.age+" "+abc.name);
    }
}

class student{
    int age;
    StringBuilder name;
    
    student(){
        age = 17;
        name = new StringBuilder("Vivek");
    }
}

