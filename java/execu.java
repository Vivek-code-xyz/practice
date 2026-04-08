public class execu {

    public static void checkAge(int age) throws invaidAgeException{
        if(age< 18){
            throw new invaidAgeException("You are not eligible as you are minor");

        }
        else{
            System.out.println("You are eligible for the voting");
        }

        
    }
    public static void main(String[] args) {
        try{

            checkAge(10);
        }catch( Exception e){
            System.out.println("Exeption occures : "+e);
        }
    }
}


class invaidAgeException extends Exception{

    invaidAgeException(String msg){
        super(msg);
    }
}
