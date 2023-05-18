import Image from "next/image"
import Head from "next/head"

export default function Error404() {
    return (
        <div className="grid-cols-1  h-screen pt-2 " >
            <Head>
                <title>Idílico - 404</title>
            </Head>
            <div className="w-full flex justify-center">
                <Image
                    alt="Has entrado en una pagina erronea revisa la direccion o ponte en contacto con nosotros"
                    src="/sello.png"
                    priority={true}
                    width={350}
                    height={350}
                />
            </div>
            <h1 className="w-full text-center text-9xl">404</h1>
            <h1 className="w-full text-center  text-3xl">Página no encontrada</h1>



        </div>
    )
}