import connectMongo from "./connectMongo"
import Usuario from "../models/usuario"
import { jwtVerify } from "jose"

export default async function chekToken (token){
    
   
    try{

        const encoder=new TextEncoder()
        const jwtData=await jwtVerify(token,encoder.encode(process.env.JWT_PRIVATE_KEY))
        await connectMongo()
        const usuario=await Usuario.findById(jwtData.payload._id)
        if(usuario){
            return true
        }
        return false
    }catch(err){ 
        console.log(err)
        return false
    }

  

}