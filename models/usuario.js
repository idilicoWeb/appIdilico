
import { Schema, model, models, Types } from 'mongoose';
const bcrypt = require("bcrypt")
const saltRounds = 10

var UsuarioSchema = new Schema({
    correo: { type: String, unique: true },
    password: { type: String, required: true },
    
})

UsuarioSchema.pre("save", function (next) {
    const document = this

    if (this.isNew || this.isModified("password")) {

        bcrypt.hash(document.password, saltRounds, (err, hashedPwd) => {
            if (err) {
                next(err)
            } else {
                document.password = hashedPwd
                next()
            }

        })
    } else {
        next()
    }
})


UsuarioSchema.methods.isCorrectPassword = function (pwd, callback) {
    return bcrypt.compare(pwd, this.password, function (err, same) {
        if (err) {
            callback(err)

        } else {
            callback(err, same)

        }
    })
}




const Usuario = models.Usuario || model('Usuario', UsuarioSchema);

export default Usuario;