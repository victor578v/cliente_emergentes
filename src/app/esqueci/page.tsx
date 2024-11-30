"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

type Inputs = {
  email: string
}

export default function RecuperarSenha() {
  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter()

  async function enviaRecuperacao(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/recuperar-senha`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: data.email })  
    })

    if (response.status === 200) {
      alert("Um link para redefinir sua senha foi enviado para seu e-mail.")
      router.push(`/recupera?email=${data.email}`) // Redireciona para a página de recuperação com o e-mail
    } else {
      alert("Erro ao enviar o link. Verifique se o e-mail está correto.")
    }
  }

  return (
    <section className="bg-orange-100 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Recuperar Senha
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(enviaRecuperacao)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail do Cliente:</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Julio@gmail.com" 
                  required 
                  {...register("email")} />
              </div>
              <button type="submit" className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Enviar Link de Recuperação</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Lembrou a senha? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Faça Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

