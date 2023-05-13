import { Schema, model, models,Types} from 'mongoose';

const CategoriaSchema = new Schema({
   
    titulo:{type:String, required:true,unique:true},
    subtitulo:String,
    orden:Number,
    adornos:{
        s:String,
        m:String,
        l:String
    }
});

const Categoria = models.Categoria || model('Categoria', CategoriaSchema);

export default Categoria;