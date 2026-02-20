import axios from "axios";


const PISTON_URL = "https://emkc.org/api/v2/piston/execute"

export default async function runPiston({language,code,stdin=""}){

    // for(let i=0;i<3;i++){
        try{

            const {data} = await axios.post(PISTON_URL,{
                language,
                version:'*',
                files: [
                    {
                        name: "main",
                        content: code
                    }
                ],
                stdin
            })

            // console.log(data);

            return data
            

        }
        catch(e){
            throw new Error("Failed to execute The code on piston") 
           
        }
    // }

}