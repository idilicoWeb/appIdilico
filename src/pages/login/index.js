import Head from "next/head"
import Image from "next/image"
import { useRef } from "react"
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/aut-context'
import { useContext } from "react"

export default function Login (props) {

    const authContext = useContext(AuthContext);

    const correoRef = useRef(null)
    const passRef = useRef(null)
    const router=useRouter()


    return <main
        classNameName='flex flex-col auto-cols-max '
    >
        <Head>
            <title>Idílico - Login</title>
        </Head>
        <section className="flex" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image src="/sello.png" width={200} height={200} />
                </div>
                <div className="bg-white w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            DATOS
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"

                        >
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    CORREO
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    ref={correoRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="correo@restauranteidilico.es"
                                    required={true}
                                />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    CONTRASEÑA
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required={true}
                                    ref={passRef}
                                />
                            </div>
                            <button
                                onClick={async e => {
                                    const correo=correoRef.current.value
                                    const password=passRef.current.value
                                    const loginData={correo,password}
                                    const response=await fetch(
                                        "/api/login",
                                        {
                                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                                            headers: {
                                                "Content-Type": "application/json",
                                                // 'Content-Type': 'application/x-www-form-urlencoded',
                                            },
                                            body: JSON.stringify(loginData)
                                        }
                                    )
                                    if(response.status==200){
                                        const data=await response.json()
                                       
                                        authContext.setAuthState(data)
                                        router.push("/admin")
                                    }else{
                                        alert(response.message)
                                    }
                                }}
                                className="btn bg-verde w-full py-2 rounded">
                                ACCEDER
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>
}
