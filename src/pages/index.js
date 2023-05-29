import Image from "next/image"
import Head from "next/head"
import MenuBar from "@/components/menuBar"
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
