import Image from 'next/image'
//import { Comic_Neue } from 'next/font/google'
import Head from 'next/head'
import alergenos from '../../data/alergenos'
import Categoria from '../../../models/categoria'
import Plato from '../../../models/plato'
import { useState } from 'react'
import connectMongo from '../../../utils/connectMongo'

import { useScrollPosition } from '@n8tb1t/use-scroll-position'



const getAlergenoById = (alergenoId) => {
  return alergenos.find(alergeno => alergeno._id == alergenoId)
}

const generateAlergenos = (alergenosPlatoIDs) => {
  const alergenosPlato = alergenosPlatoIDs.map(id => getAlergenoById(id))
  const size = 30
  return <div className='flex mt-2 '>

    {alergenosPlato.map(alergeno => {
      return <Image
        key={alergeno._id}
        className="mr-1"
        src={alergeno.icono}
        width={size}
        height={size}
        alt={alergeno.titulo}
      />
    })
    }
  </div>
}

const generatePlato = (plato) => {

  if (plato == undefined) { return null }
  const { nombre, precio, descripcion, alergenos } = plato
  return (
    <div className='mb-5 '>
      <p className='text-xl flex justify-between mb-0.5 font-bold font-mono'>
        {nombre}<span className='text-lg'>{precio != null ? precio.toFixed(2) : 0.0}€</span>
      </p>
      <p className="italic break-words ">{descripcion}</p>
      {alergenos ? generateAlergenos(alergenos) : null}
    </div>
  )
}

const generateAdornosCategorias = (adornos) => {
  const { s, m, l } = adornos
  //console.log(adornos)
  return (
    <div>
      {s ? <div className='flex justify-center md:hidden'>
        <Image
          src={s}
          width={200}
          height={50}
        />
      </div> : null}
      {m ? <div className='hidden md:flex md:justify-center lg:hidden'>
        <Image
          src={m}
          width={300}
          height={50}
        />
      </div> : null}
      {l ? <div className='hidden lg:flex lg:justify-center'>
        <Image
          src={l}
          width={300}
          height={200}
        />
      </div> : null}
    </div>

  )
}

const generateCategoria = (categoria, platos, animation) => {
  const { titulo, subtitulo, adornos } = categoria

  return (

    <div className={"p-4 mb-4 "}>
      <p className={'text-3xl mb-4 font-bold font-mono ' }>
        {titulo.toUpperCase()}
      </p>
      {subtitulo ? <p className='mb-5 font-bold'>{subtitulo}</p> : null}
      {
        platos.filter(plato => plato.categoria_id == categoria._id).map(plato => generatePlato(plato))
      }
      {adornos ? generateAdornosCategorias(adornos) : null}

    </div>

  )
}

const generateCategorias = (platos, categorias) => {
  return (
    categorias.map((categoria) => generateCategoria(categoria, platos, categorias.length == 1 ? "animate-bounce" : null))
  )
}


const Buscador = (props) => {
  const { categorias, setCategorias, hideOnScroll, resetBuscador } = props
  const [currentBusqueda, setCurrentBusqueda] = useState(null)
  const sugerencias = categorias.map((categoria) => categoria.titulo?.toUpperCase())

  if (!hideOnScroll) {
    return null
  }

  return <form
    onSubmit={(e) => { e.preventDefault() }}
    className="fade-in flex w-full  pl-4 items-center m-2 right-0 lg:w-1/4 xl:w-1/6 fixed bottom-0 md:w-1/3 md:right-0">

    <div className="relative w-full">

      <select


        className="shadow-xl bg-verde text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        value={currentBusqueda ? currentBusqueda.titulo.toUpperCase() : ""}
        onInput={(e) => {
          const busqueda = e.target.value
          if (busqueda != "TODAS") {
            const categoria = categorias.find(categoria => {
              ////console.log(e.target.value)
              return categoria.titulo.toUpperCase() == e.target.value
            })
            if (categoria) {
              setCategorias([categoria])
              setCurrentBusqueda(categoria)
            }

          } else {
            setCurrentBusqueda({ titulo: "TODAS" })
            resetBuscador()

          }

        }}

      > <option className="text-lg text-center py-2" value={"TODAS"}>TODAS LAS CATEGORIAS</option>
        {
          sugerencias.map((sugerencia) => {
            //console.log(sugerencia)
            return <option key={sugerencia} className="text-center" value={sugerencia}>{sugerencia.toUpperCase()}</option>
          })
        }
      </select>

    </div>
    <div
      onClick={() => {
        resetBuscador()
        setCurrentBusqueda({ titulo: "TODAS" })
      }}
      className="ml-2 text-sm font-medium bg-rosa rounded-full shadow-xl">
      <Image src="/sello.png" width={64} height={64} />

      <span className="sr-only">¿Qué te apetece?</span>

    </div>
  </form>
}


export default function Carta(props) {
  const [platos, setPlatos] = useState(props.platos)
  const [allCategorias,] = useState(props.categorias)
  const [categorias, setCategorias] = useState(props.categorias)

  const [hideOnScroll, setHideOnScroll] = useState(true)


  useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y > prevPos.y
    if (isShow !== hideOnScroll) setHideOnScroll(isShow)
  }, [hideOnScroll])

  const resetBuscador = () => {
    setCategorias(allCategorias)
  }

  return (
    <main
      className='flex flex-col auto-cols-max '
    >
      <Head>
        <title>Idílico - Menú</title>
      </Head>
      <div className='flex justify-around border-b borde_abajo'>
        <Image
          src="/cabecera.png"
          width={500}
          height={100}
          alt="logo empresa"
        />
      </div>
      <Buscador
        platos={platos}
        categorias={allCategorias}
        setCategorias={setCategorias}
        hideOnScroll={hideOnScroll}
        resetBuscador={resetBuscador}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {
          generateCategorias(platos, categorias)
        }

      </div>



    </main>
  )
}


export const getServerSideProps = async () => {
  await connectMongo()
  const categorias = await Categoria.find()
  const platos = await Plato.find()

  const categoriasOrdenadas = categorias.sort((a, b) => a.orden - b.orden)
  return {
    props: {
      categorias: JSON.parse(JSON.stringify(categoriasOrdenadas)),
      platos: JSON.parse(JSON.stringify(platos))
    },
  };
};