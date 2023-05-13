import connectMongo from '../../../utils/connectMongo';
import Categoria from "../../../models/categoria";
import Plato from '../../../models/plato';

export default async function handler(req, res) {
    const { method } = req;
    try {
        switch (method) {
            case "GET":
                await connectMongo()
                const categorias = await Categoria.find()
                res.status(200).json(categorias);
                break;

            case "POST":
                await connectMongo()
                const categoria = new Categoria(req.body)
                try {
                    const savedCategoria = await categoria.save()
                    res.status(201).json(savedCategoria)
                } catch (e) {
                    res.status(501).json({ message: e.message })
                }


                break;

            case "PATCH":
                await connectMongo()
                const findedCategoria = await Categoria.findByIdAndUpdate(req.body._id, req.body)
                const patchedCategoria = await findedCategoria.save()
                res.status(200).json(patchedCategoria);
                break;

            case "PUT"://borrar
                await connectMongo()
                
                await Plato.deleteMany({categoria_id:req.body._id})
               
                try{
                    const categoriaToDelete = await Categoria.findByIdAndDelete(req.body._id)
                    
                }catch(e){

                }                
              
                

                
                res.status(200).json({ message: "borrado correctamente" })
                break;

            default:
                res.status(405).end(`No puedes hacer eso`);
                break;

        }
    } catch (e) {
        res.json({ error: e })
    }

}