const jose = require('jose')
const { jwtVerify } = require("jose")

import Usuario from "../../../models/usuario";
import connectMongo from '../../../utils/connectMongo';

const generateToken = async (usuario) => {
    const data = { _id: usuario._id }
    const encoder = new TextEncoder()
    const jwtConstructor = new jose.SignJWT(data)
    const jwt = await jwtConstructor.setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

    return jwt
}



export default async function handler(req, res) {
    const { method } = req;
    const { correo, password } = req.body // se extraen los datos de correo, contraseña y empresa del cuerpo de la solicitud

    try {
        switch (method) {
            case "POST":
                await connectMongo();
                const u = await Usuario.findOne({ correo }) // se busca un usuario con el correo proporcionado
                
                if (!u) { // si no se encuentra un usuario con ese correo, se envía una respuesta con un código de estado 401 (no autorizado) y un mensaje de error
                    res.status(401).json({ message: "usuario o contraseña incorrectos" })

                    break;
                } else {

                    u.isCorrectPassword(password, async (err, same) => { // se verifica si la contraseña proporcionada es correcta para el usuario encontrado

                        if (!same) { // contraseña incorrecta
                            res.status(403)
                         
                        } else {
                            console.log("esto sale")
                            const token = await generateToken(u)
                            console.log(".......................")
                            console.log(token)
                            res.status(200).json({ token })

                        }

                    })
                }
                break;
            /*
            case "PUT":
                await connectMongo();
                console.log(req.body)
                const newUser = await new Usuario(req.body).save()
                res.status(201).json({ usuario: newUser })
                break;
            */
            default:
                res.status(403).json({ message: "No puedes hacer eso" })
                break
        }
    } catch (e) {
        console.log(e)
        res.status(501).json({ message: "ups algo salio mal" })
    }
}




