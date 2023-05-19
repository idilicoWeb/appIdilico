import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

const Hero = ({ children, hero }) => {

  return <div className="w-screen h-screen overflow-hidden bg-verde">
    <AnimatePresence>
      <motion.div
        key={hero.image}
        className="heroSlider "

        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >

        <Image className="heroImage md:heroImageMD" src={hero.image} fill={true} priority={true} alt={"imagen de fondo que muestra una de nuestras imagenes favoritas"} />

      </motion.div>

    </AnimatePresence>

    {children}

  </div>
}

const Texto = (props) => {
  return (
    <div
      className="text-lg z-20 w-screen h-screen grid content-center px-4 "

    >
      <p className="text-center z-20 text-5xl md:text-6xl grid content-center text-white">{props.text}</p>
    </div>
  )
}

const heroMockUp = [
  { text: "Come bien, vive rico", image: "/fotos/salon1.jpg" },
  { text: "Ven a visitarnos", image: "/fotos/salon2.jpg" },
  { text: "¿Te lo vas a perder?", image: "/fotos/salon3.jpg" },
  { text: "Come bien, vive rico", image: "/fotos/salon4.jpg" }
]

const MenuBar = () => {
  const router = useRouter()

  const goTo = (url) => {
    router.push(url)
  }
  return (
    <div className="z-20 w-full absolute py-3 flex text-sm font-bold navegador border-b backdrop-blur">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", type: "spring", bounce: 0.5 }}
        className="w-2/3 pl-2"
      >
        <Image alt="" src="/sello.png" width={48} height={48} priority={true} />
      </motion.div>
      <div className="flex gap-3  w-1/3 justify-end pr-3 align-middle ">
        <div onClick={() => { goTo("/nosotros") }} className="cursor-pointer grid content-center">Nosotros</div>
        <div onClick={() => { goTo("/carta") }} className="cursor-pointer grid content-center" >Carta</div>
      </div>

    </div>
  )
}



export default function Home() {
  const [heroes,] = useState(heroMockUp)
  const [currentHeroId, setCurrentHeroId] = useState(0)
  const [hero, setHero] = useState(heroMockUp[0])
  

  useEffect(() => {
    const newId = currentHeroId + 1 < heroes.length ? currentHeroId + 1 : 0
    const timer = setTimeout(() => {
      setHero(heroes[newId]);
      setCurrentHeroId(newId)
    }, 6000)
    return () => clearTimeout(timer)
  }, [hero])

  return (
    <Hero hero={hero}>
       <Head>
        <title>IIdilico</title>
      </Head>
      <MenuBar />
      <AnimatePresence>
        <motion.div
          className="z-30"
          key={hero.text}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 100, backgroundColor: "rgba(50, 75, 71,0.35)", opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Texto text={hero.text} />
        </motion.div>

      </AnimatePresence>

    </Hero>
  )
}
