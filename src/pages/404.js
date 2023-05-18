import Image from "next/image"
import Head from "next/head"

export default function Error404 (){
    return (
        <div className="grid-cols-1 h-screen mt-20" >
            <Head>
        <title>Idílico - 404</title>
      </Head>
            <div className="w-full flex justify-center mb-10 px-6">
                <Image
                alt="Has entrado en una pagina erronea revisa la direccion o ponte en contacto con nosotros"
                src="/sello.png"
                priority={true}
                width={400}
                height={400}
            />
            </div>
            <h1 className="w-full text-center text-9xl">404</h1>
            <h1 className="w-full text-center  text-3xl">Página no encontrada</h1>
            
            
            
        </div>
    )
}