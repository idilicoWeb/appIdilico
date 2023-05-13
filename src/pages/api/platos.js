

import connectMongo from '../../../utils/connectMongo';
import Plato from "../../../models/plato";


export default  async function handler(req, res) {
    const { method } = req;
 
  switch (method) {
    case "GET":
      await connectMongo()
      const platos=await Plato.find()
      res.status(200).json(platos);
      break;
    
    case "POST":
      await connectMongo()
      const plato=new Plato(req.body)
      try{
        const savedPlato=await plato.save()
        res.status(201).json(savedPlato)
      }catch(e){
        res.status(501).json({message:e.message})
      }
      
     
      break;

    case "PATCH":
      await connectMongo()
      const findedPlato=await Plato.findByIdAndUpdate(req.body._id,req.body)
      const patchedPlato=await findedPlato.save()
      res.status(200).json(patchedPlato);
      break;
    
    case "PUT":
      await connectMongo()
      const platoToDelete=await Plato.findByIdAndDelete(req.body._id)
      platoToDelete.save()
      console.log("borrado")
      res.status(200).json({message:"borrado correctamente"})
      break;
      
    default:      
      res.status(405).end(`No puedes hacer eso`);
      break;
  }
}