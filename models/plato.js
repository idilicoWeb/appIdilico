import { Schema, model, models,Types } from 'mongoose';

const PlatoSchema = new Schema({
   
    nombre:String,
    descripcion:String,
    precio:Number,
    categoria_id:String,
    alergenos:Array
});

const Plato = models.Plato || model('Plato', PlatoSchema);

export default Plato;