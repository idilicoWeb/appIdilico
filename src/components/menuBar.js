import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

export default function MenuBar  () {
    const router = useRouter()
  
    const goTo = (url) => {
      router.push(url)
    }
    return (
      <div className="z-20 w-full absolute py-3 flex text-sm font-bold navegador border-b backdrop-blur ">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "easeInOut", type: "spring", bounce: 0.5 }}
          className="w-2/3 pl-2"
        >
          <a href="/"><Image alt="" src="/sello.png" width={48} height={48} priority={true} /></a>
        </motion.div>
        <div className="flex gap-3  w-1/3 justify-end pr-3 align-middle ">
          <div onClick={() => { goTo("/contacto") }} className="cursor-pointer grid content-center">Contacto</div>
          <div onClick={() => { goTo("/carta") }} className="cursor-pointer grid content-center" >Carta</div>
        </div>
  
      </div>
    )
  }
