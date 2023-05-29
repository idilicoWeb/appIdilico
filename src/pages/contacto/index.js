import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faClock, faHeart, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import MenuBar from "@/components/menuBar";
import Link from "next/link";
export default function Contacto() {
    return (
        <main className="relative max-w-screen max-h-screen text-xl flex justify-center">
            <Head>
                <title>Idilico - Contacto</title>
            </Head>
            <MenuBar />
            <div className="w-full px-2 bg-rosa py-20 md:py-28 md:w-3/4">
                <div className="w-full  pl-2">

                   


                    <div>
                        <p>
                            <FontAwesomeIcon className="mr-2 text-2xl" icon={faPhone} />
                            Reservas:
                        </p>
                        <Link className="pl-3 text-2xl" href="tel:951157492">951157492</Link>
                    </div>
                    <div>

                        <p>
                            <FontAwesomeIcon className="mr-2 text-2xl" icon={faClock} />
                            Horario:
                        </p>
                        <p className="pl-3 text-2xl">13:00-00:00</p>
                    </div>
                    <div className="grid justify-self-center">
                        <p>
                            <FontAwesomeIcon className="mr-2 text-2xl" icon={faHeart} />
                            Síguenos:
                        </p>


                        <a href="https://www.instagram.com/idilico_pacifico/">

                            <FontAwesomeIcon icon={faInstagram} className="pl-3 text-3xl" />
                        </a>
                    </div>


                </div>
                <div className="flex-cols text-xl">
                    <p className="mb-2">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-2xl" />
                        Ven a vernos en :
                    </p>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.253610619436!2d-4.443614288312823!3d36.692443172162406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f999a4240c35%3A0x9d8323fe00242074!2zSWTDrWxpY28!5e0!3m2!1ses!2ses!4v1684522023452!5m2!1ses!2ses" width="600" height="450"
                        allowfullscreen=""
                        loading="lazy"
                        className="flex w-full rounded-2 border-2"
                        referrerpolicy="no-referrer-when-downgrade">

                    </iframe>
                </div>
            </div>

        </main >
    )
}