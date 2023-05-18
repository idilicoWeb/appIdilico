
import alergenos from '@/data/alergenos'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'

import Categoria from '../../../models/categoria'
import Plato from '../../../models/plato'
import connectMongo from '../../../utils/connectMongo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../../context/aut-context'

const CategoriaSelector = (props) => {
    const { categoria_id, categorias, setCategoriaId } = props
    const selectorRef = useRef(null)

    return (
        <div className="px-3 mb-6">
            <label className="text-white block uppercase tracking-wide text-xs font-bold mb-2" for="grid-precio">
                categoria
            </label>
            <select
                defaultValue={categoria_id}
                onChange={() => {
                    const categoriaId = selectorRef.current.value
                    alert(categoriaId)
                    setCategoriaId(categoriaId)
                }}
                ref={selectorRef}
            >
                {categorias.map(categoria => {
                    return <option key={categoria._id} value={categoria._id}>{categoria.titulo.toUpperCase()}</option>
                })}

            </select>
        </div>

    )
}

const formatAlergenos = (alergenosPlato) => {
    return alergenos.map((alergeno) => {
        const found = alergenosPlato.find((id) => id == alergeno._id)
        return found != undefined ? Object.assign({}, alergeno, { activo: true }) : alergeno
    })
}

const EditAlergenos = (props) => {
    const setAlergenosGenerales = props.setAlergenosPlato
    const [alergenosPlato, setAlegenosPlato] = useState(props.alergenosPlato)
    const [alergenos, setAlergenos] = useState(formatAlergenos(alergenosPlato))


    useEffect(() => {
        setAlergenos(formatAlergenos(alergenosPlato))
    }, [alergenosPlato])


    return <div className="grid grid-1 px-4 justify-center mb-4">
        <p
            className="text-white uppercase tracking-wide text-xs font-bold mb-2"

        >
            Alergenos
        </p>
        <div className="grid bg-white grid-cols-7 py-4 px-2 gap-2 rounded">

            {
                alergenos.map((alergeno) => {
                    return (
                        <div key={alergeno._id}
                            onClick={() => {
                                const nuevosAlergenos = alergeno.activo ?
                                    alergenosPlato.filter(a => a != alergeno._id)
                                    : [...alergenosPlato, alergeno._id]
                                setAlegenosPlato(nuevosAlergenos)
                                setAlergenosGenerales(nuevosAlergenos)
                            }}
                            className={`${alergeno.activo ? "" : "bg-neutral-500 grayscale"}`}>

                            <Image
                                alt={"contiene el alergeno "+alergeno.titulo}
                                src={alergeno.icono}
                                width={50}
                                height={50}
                            />
                        </div>
                    )
                })
            }
        </div>
    </div>
}

const PlatoItem = (props) => {
    const { plato, setCurrentPlato } = props
    return <div
        key={plato._id}
        id={`plato-${plato._id}`}
        className="flex px-2 align-center  justify-between px-1 py-3 md:px-3">
        <div
            className="text-white p-2 flex w-3/4"
        >
            {plato.nombre}
        </div>
        <button
            onClick={() => { setCurrentPlato(plato) }}
            className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Editar
        </button>
    </div>
}

const CategoriaItem = (props) => {
    const { categoria, platos, setCurrentPlato, setCurrentCategoria } = props
    ////console.log(platos)
    return (
        <div key={categoria._id} className=" w-full bg-zinc-700">
            <p className="py-3 my-4 text-xl flex justify-between px-2 text-white ">{categoria.titulo.toUpperCase()}
                <span
                    className="text-xs bg-zinc-900 p-2 rounded border"
                    onClick={() => { setCurrentCategoria(categoria) }}
                >
                    Editar categoria
                </span>
            </p>
            {platos.map(plato => <PlatoItem key={plato._id} setCurrentPlato={setCurrentPlato} plato={plato} />)}
            <div className='flex justify-center mt-4 border-t pt-2'>
                <button
                    className='w-1/2 bg-lime-500 mb-2 rounded'
                    onClick={() => {
                        const nuevoPlato = { new: true, categoria_id: categoria._id }
                        setCurrentPlato(nuevoPlato)
                    }}
                >
                    Nuevo plato</button>
            </div>
        </div>
    )

}

const PlatoEditorForm = (props) => {
    const { platos, plato, categorias, setPlatos, hide, setCurrentMessage } = props
    const nombreRef = useRef(null)
    const descripcionRef = useRef(null)
    const precioRef = useRef(null)
    const [categoria_id, setCategoriaId] = useState(props.plato.categoria_id)
    const [alergenosPlato, setAlegenosPlato] = useState(props.plato.alergenos)
    const authContext=useContext(AuthContext)

    const updatePlato = async (platoData) => {
        
        const response = await fetch(
            "/api/platos",
            {
                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(platoData)
            }
        )

        const serverData = await response.json()
        if (response.status == 200) {

            const nuevosPlatos = platos.map(pl => {
                if (pl._id === platoData._id) {

                    return platoData
                }
                return pl
            })

            setPlatos(nuevosPlatos)
            hide()
            setCurrentMessage({ status: response.status, message: "Guardado" })
        }

    }

    const createPlato = async (platoData) => {
        const response = await fetch(
            "/api/platos",
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(platoData)
            }
        )

        if (response.status == 201) {
            const serverData = await response.json()
            setPlatos([...platos, serverData])
            setCurrentMessage({ status: response.status, message: "Creado" })
            hide()
        }

    }

    const savePlato = async (platoData) => {
        const data={...platoData,token:authContext.authState.token}
       
        if (plato.new) {
            createPlato(data)
        } else {
            updatePlato(data)
        }

    }

    const deletePlato = async (_id) => {
        const token=authContext.authState.token
        const response = await fetch(
            "/api/platos",
            {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ _id ,token})
            }
        )
        //////console.log(response.status)
        if (response.status == 200) {
            setPlatos(platos.filter(pl => pl._id != plato._id))
            hide()
            ////console.log(await response.json())
            setCurrentMessage({ status: response.status, message: "Borrado" })
        }

    }
    return (
        <form className="w-full h-full max-h-screen">
            <CategoriaSelector categorias={categorias} setCategoriaId={setCategoriaId} categoria_id={categoria_id} />
            <div className="flex  w-full">

                <div className="w-full w-3/5 md:w-1/2 px-3 mb-4 md:mb-0">
                    <   label
                        className="text-white block uppercase tracking-wide text-xs font-bold mb-2"
                        for="grid-nombre"
                    >
                        Nombre
                    </label>
                    <input
                        id="grid-nombre"
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        defaultValue={plato.nombre}
                        ref={nombreRef}

                    />
                </div>
                <div className="w-2/5 md:w-1/2 px-3">
                    <label className="text-white block uppercase tracking-wide text-xs font-bold mb-2" for="grid-precio">
                        €
                    </label>
                    <input
                        id="grid-precio"
                        className="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        defaultValue={plato.precio}
                        ref={precioRef}
                    />
                </div>


            </div>
            <div className="w-full px-3 mb-6 md:mb-0 ">
                <label
                    for="descripcion"
                    className="text-white block uppercase tracking-wide text-xs font-bold mb-2">
                    Descripcion
                </label>
                <textarea
                    id="descripcion"
                    rows={7}
                    className="p-2.5 h-full w-full h-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={plato.descripcion}
                    ref={descripcionRef}
                />
            </div>

            <EditAlergenos setAlergenosPlato={setAlegenosPlato} alergenosPlato={plato.new ? [] : plato.alergenos} />

            <div className='flex float md:fixed p-2 w-full justify-around gap-2  bottom-4'>
                <button
                    className='btn w-2/3   bg-lime-500 rounded  text-white'
                    onClick={(e) => {
                        e.preventDefault()
                        var newNombre = nombreRef.current.value
                        newNombre != "" ? newNombre : plato.nombre
                        var newPrecio = precioRef.current.value
                        newPrecio != "" ? newPrecio : plato.precio
                        var newDescripcion = descripcionRef.current.value
                        newDescripcion != "" ? newDescripcion : plato.descripcion
                        var newCategoria = categoria_id;
                        var newAlergenos = alergenosPlato;

                        const isDistinto = newCategoria != plato.categoriaId || newAlergenos.join("") != plato.alergenos.join("") || newNombre != plato.nombre || newPrecio != plato.precio || newDescripcion != plato.descripcion

                        if (isDistinto) {
                            const newPlato = Object.assign({}, plato, { nombre: newNombre, descripcion: newDescripcion, precio: newPrecio, categoria_id: newCategoria, alergenos: newAlergenos })
                            savePlato(newPlato)
                        }

                    }}
                >
                    GUARDAR
                </button>
                <button
                    disabled={plato.new}
                    className='btn w-1/3 bg-rose-500   bg-lime-500 rounded text-white'
                    onClick={(e) => {
                        e.preventDefault()
                        let acepta = confirm("¿Borrar?");

                        if (acepta) {

                            deletePlato(plato._id)
                        }
                    }}
                >
                    BORRAR
                </button>
            </div>
        </form>

    )
}

const PlatoEditor = (props) => {
    const {
        platos,
        visible,
        plato,
        hide,
        categorias,
        setPlatos,
        setCurrentMessage } = props
    if (visible) {
        return (
            <div className={"w-screen h-fit max-h-screen "}>
                <p
                    className="flex text-xl justify-end  text-white mb-4 pr-4 pt-4"
                    onClick={() => { hide() }}>
                    X
                </p>
                <PlatoEditorForm
                    setCurrentMessage={setCurrentMessage}
                    hide={hide}
                    platos={platos}
                    plato={plato}
                    categorias={categorias}
                    setPlatos={setPlatos}
                />
            </div>
        )
    }

    return null

}

const ImageSelector = (props) => {
    const { adornos, tamPantalla, currentAdorno, setAdorno } = props

    const classImage = " p-2 flex flex-col rounded bg-zinc-100 "
    const activeClass = " border border-4 border-black "

    return (
        <div className='md:flex md:w-1/3 mt-2 px-3 border-r'>
            <label
                className="text-white block uppercase tracking-wide text-xs font-bold mb-2">
                {"Carta-" + tamPantalla}
            </label>
            <div className="flex gap-3 mt-2 px-3 py-4 overflow-scroll max-h-48 ">
                <div onClick={() => setAdorno(null)} className={(currentAdorno == null ? activeClass : "") + classImage}>

                    <p className="text-5xl text-center">⛔</p>
                    <p className=''>Ninguna</p>
                </div>
                {adornos.map(adorno => {
                    const isActive = currentAdorno == ("/" + adorno)
                    return <div
                        key={adorno}
                        onClick={() => {
                            setAdorno("/" + adorno)
                        }}
                        className={(isActive ? activeClass : "") + classImage}>

                        <Image
                            alt=""
                            className='place-self-center'
                            src={"/adornos/" + adorno}
                            width={50}
                            height={50}
                        />
                        <p className=''>Seleccionar</p>
                    </div>
                })}
            </div>
        </div>
    )
}

const CategoriaForm = (props) => {
    const { categoria, categorias, adornos, setCurrentMessage, hide, setCategorias } = props
    const tituloRef = useRef(null)
    const subTituloRef = useRef(null)
    const ordenRef = useRef(null)
    const [adornosCategoria, setAdornosCategoria] = useState(props.categoria.adornos)
    const authContext=useContext(AuthContext)

    const updateCategoria = async (categoriaData) => {

        const response = await fetch(
            "/api/categorias",
            {
                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(categoriaData)
            }
        )


        if (response.status == 200) {

            const nuevasCategorias = categorias.map(cat => {
                if (cat._id === categoria._id) {

                    return categoriaData
                }
                return cat
            })

            setCategorias(nuevasCategorias)

            hide()
            setCurrentMessage({ status: response.status, message: "Guardado" })
        }

    }

    const createCategoria = async (categoriaData) => {
        const response = await fetch(
            "/api/categorias",
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(categoriaData)
            }
        )

        if (response.status == 201) {
            const serverData = await response.json()

            setCategorias([...categorias, serverData])
            hide()
            setCurrentMessage({ status: response.status, message: "Creado" })
        }

    }

    const saveCategoria = async (categoriaData) => {
        const token=authContext.authState.token
        const data={...categoriaData,token}

        if (categoria.new) {
            createCategoria(data)
        } else {
            updateCategoria(data)
        }

    }

    const deleteCategoria = async (_id) => {
        const token=authContext.authState.token

        const response = await fetch(
            "/api/categorias",
            {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ _id ,token})
            }
        )

        if (response.status == 200) {
            setCategorias(categorias.filter(cat => cat._id != _id))
            hide()
            setCurrentMessage({ status: response.status, message: "Borrado" })
        }

    }




    return (
        <form className="w-full h-full ">
            <div className="flex">
                <div className="w-3/5 px-3 mb-4 md:mb-0">
                    <   label
                        className="text-white block uppercase tracking-wide text-xs font-bold mb-2"
                        for="grid-nombre"
                    >
                        Titulo
                    </label>
                    <input
                        id="grid-nombre"
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        defaultValue={categoria.titulo}
                        ref={tituloRef}

                    />
                </div>
                <div className="w-2/5 px-3 mb-4 md:mb-0">
                    <   label
                        className="text-white block uppercase tracking-wide text-xs font-bold mb-2"
                        for="grid-nombre"
                    >
                        Orden
                    </label>
                    <input
                        id="grid-nombre"
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        defaultValue={categoria.new ? categorias.length + 1 : categoria.orden}
                        ref={ordenRef}

                    />
                </div>
            </div>

            <div className="w-full px-3 mb-6 md:mb-0 ">
                <label
                    for="descripcion"
                    className="text-white block uppercase tracking-wide text-xs font-bold mb-2">
                    Subtitulo
                </label>
                <textarea
                    id="descripcion"
                    rows={7}
                    className="p-2.5 h-full w-full h-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={categoria.subtitulo}
                    ref={subTituloRef}
                />

            </div>
            <div className="w-full mt-2 px-3 ">
                <label
                    className="text-white block uppercase tracking-wide text-xs font-bold mb-2">
                    Adornos
                </label>
                <p className='text-white'>
                    Los adornos son las imagenes
                    que se agregan al final de la categoria
                    utilizalas para cubrir los huecos
                </p>

            </div>
            <div className="md:flex">

                <ImageSelector
                    adornos={adornos}
                    tamPantalla={"mobil"}
                    setAdorno={(nuevoAdorno) => {
                        const nuevosAdornos = Object.assign({}, adornosCategoria, { s: nuevoAdorno })
                        setAdornosCategoria(nuevosAdornos)

                    }}
                    currentAdorno={adornosCategoria ? adornosCategoria.s : null}
                />
                <ImageSelector
                    adornos={adornos}
                    tamPantalla={"tablet"}
                    currentAdorno={adornosCategoria ? adornosCategoria.m : null}
                    setAdorno={(nuevoAdorno) => {
                        const nuevosAdornos = Object.assign({}, adornosCategoria, { m: nuevoAdorno })
                        setAdornosCategoria(nuevosAdornos)

                    }}
                />
                <ImageSelector
                    adornos={adornos}
                    tamPantalla={"pc"}
                    currentAdorno={adornosCategoria ? adornosCategoria.l : null}
                    setAdorno={(nuevoAdorno) => {
                        const nuevosAdornos = Object.assign({}, adornosCategoria, { l: nuevoAdorno })
                        setAdornosCategoria(nuevosAdornos)

                    }}
                />

            </div>

            <div className='flex float md:fixed p-2 w-full justify-around gap-2  bottom-4'>
                <button
                    className='btn w-2/3   bg-lime-500 rounded  text-white'
                    onClick={(e) => {
                        e.preventDefault()
                        var newTitulo = tituloRef.current.value
                        newTitulo != "" ? newTitulo : categoria.titulo
                        var newSubtitulo = subTituloRef.current.value
                        newSubtitulo != "" ? newSubtitulo : categoria.subtitulo
                        var newOrden = ordenRef.current.value
                        newOrden != "" ? newOrden : categoria.orden


                        const newData = Object.assign({}, categoria, {
                            titulo: newTitulo,
                            subtitulo: newSubtitulo,
                            adornos: adornosCategoria,
                            orden: newOrden
                        })
                        saveCategoria(newData)
                    }}
                >
                    GUARDAR
                </button>
                <button
                    disabled={categoria.new}
                    className='btn w-1/3 bg-rose-500   bg-lime-500 rounded text-white'
                    onClick={(e) => {
                        e.preventDefault()
                        let acepta = confirm("¿Borrar?");

                        if (acepta) {
                            deleteCategoria(categoria._id)

                        }
                    }}
                >
                    BORRAR
                </button>
            </div>

        </form>
    )

}

const CategoriaEditor = (props) => {
    const { visible, hide, categorias, categoria, adornos, setCategorias, setCurrentMessage } = props
    if (visible) {
        return (
            <div className={"w-screen h-fit "}>
                <p
                    className="flex justify-end  text-white mb-4 pr-4 pt-4"
                    onClick={() => { hide() }}>
                    Salir
                </p>
                <CategoriaForm hide={hide} categorias={categorias} setCategorias={setCategorias} setCurrentMessage={setCurrentMessage} adornos={adornos} categoria={categoria} />
            </div>
        )
    }

    return null
}

const CategoriaList = (props) => {
    const { visible, platosHuerfanos, categorias, platos, setCurrentPlato, setCurrentCategoria } = props
    if (visible) {
        return <div>
            {
                categorias.map((categoria) => {
                    const platosCategoria = platos.filter(plato => plato.categoria_id == categoria._id)
                    return (
                        <CategoriaItem
                            setCurrentCategoria={setCurrentCategoria}
                            key={categoria._id}
                            setCurrentPlato={setCurrentPlato}
                            categoria={categoria}
                            platos={platosCategoria}
                        />
                    )

                })
            }

            {
                platosHuerfanos ? <CategoriaItem
                    setCurrentCategoria={setCurrentCategoria}
                    setCurrentPlato={setCurrentPlato}
                    categoria={{ titulo: "sin categoria" }}
                    platos={platosHuerfanos}
                /> : null
            }
        </div>


    }
    return null
}

const PopUp = (props) => {
    const { message, visible, hide } = props
    const { status } = message != null ? message : 0
    const isValid = status == 200 || status == 201;
    if (visible) {
        const bgColor = (isValid ? " bg-lime-500" : "bg-red-500")
        return (
            <div
                onClick={() => hide()}
                className='flex items-center justify-center absolute md:w-1/2 w-full px-2 py-2 ' >
                <div className={'flex border border-4 flex-col justify-center rounded-full w-36 h-36 ' + bgColor}>
                    <p className="text-5xl text-center drop-shadow-lg ">{isValid ? "🐒" : "🙊"}</p>
                    <p className="text-white text-center drop-shadow-md  mt-2 text-lg text">{message.message}</p>
                </div>
            </div>
        )
    }
    return null
}

export default function AdminIndex(props) {
    const { adornos, platosHuerfanos } = props
    const [platos, setPlatos] = useState(props.platos)
    const [categorias, setCategorias] = useState(props.categorias)
    const [currentPlato, setCurrentPlato] = useState(null)
    const [currentCategoria, setCurrentCategoria] = useState(null)
    const [message, setCurrentMessage] = useState(null)
    

    const router = useRouter();
    const authContext = useContext(AuthContext);




    useEffect(() => {
        console.log(router.pathname)
        // checks if the user is authenticated
        if (authContext) {
            authContext.isUserAuthenticated() 
                ? router.path!="/admin"?router.push("/admin"):null
                : router.push("/login");
        } 

    }, []);


    useEffect(() => {
        var timer = null
        if (message != null) {
            timer = setTimeout(() => {
                setCurrentMessage(null)
            }, 2000)
        }


        return () => clearTimeout(timer)

    }, [message])

    return (
        <div className="bg-zinc-500 pt-2 grid-1 w-full min-h-screen max-w-sceen ">
            <Head>
                <title>Idílico - Admin</title>
            </Head>
            <PopUp hide={() => setCurrentMessage(null)} message={message} visible={message != null} />
            <PlatoEditor
                visible={currentPlato != null && currentCategoria == null}
                categorias={categorias}
                plato={currentPlato}
                platos={platos}
                hide={() => setCurrentPlato(null)}
                setPlatos={setPlatos}
                setCurrentMessage={setCurrentMessage}
            />
            <CategoriaEditor
                visible={currentCategoria != null && currentPlato == null}
                setCategoria={setCurrentCategoria}
                categoria={currentCategoria}
                categorias={categorias}
                platos={platos}
                adornos={adornos}
                setCategorias={setCategorias}
                hide={() => setCurrentCategoria(null)}
                setCurrentMessage={setCurrentMessage}
                platosHuerfanos={platosHuerfanos}
            />

            <CategoriaList
                setCurrentPlato={setCurrentPlato}
                setCurrentCategoria={setCurrentCategoria}
                visible={currentPlato == null && currentCategoria == null}
                categorias={categorias}
                platos={platos}

            />
            {currentPlato || currentCategoria ? null :
                <div
                    className='flex justify-center bg-lime-500 p-2 mt-5'
                    onClick={() => setCurrentCategoria({ adornos: {}, new: true })}
                >

                    Nueva categoria
                </div>
            }
        </div>

    )
}

export const getServerSideProps = async () => {
    await connectMongo()
    const categorias = await Categoria.find()
    const platos = await Plato.find()

    const fs = require('fs')
    const path = require('path')
    const getConfig = require('next/config')
    const { serverRuntimeConfig } = getConfig()

    const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './public/adornos')
    const adornos = fs.readdirSync(dir);

    const categoriasOrdenadas = categorias.sort((a, b) => a.orden - b.orden)
    const platosHuerfanos = platos.filter(plato => {
        return null != categorias.find(categoria => plato.categoria_id == categoria.id)
    })
    return {
        props: {
            adornos: adornos,
            platosHuerfanos: JSON.parse(JSON.stringify(platosHuerfanos)),
            categorias: JSON.parse(JSON.stringify(categoriasOrdenadas)),
            platos: JSON.parse(JSON.stringify(platos))
        },
    };
};