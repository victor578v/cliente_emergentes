"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { useEffect, useState, Suspense } from "react"

type Inputs = {
  codigo: string
  novaSenha: string
}

function RecuperaSenhaComponent() {
  const { register, handleSubmit } = useForm<Inputs>()
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams() // Usando useSearchParams para acessar a query string

  useEffect(() => {
    const emailFromQuery = searchParams.get("email")
    if (emailFromQuery) {
      setEmail(emailFromQuery)
    }
  }, [searchParams]) // Atualiza sempre que a query mudar

  async function enviarCodigoRecuperacao(data: Inputs) {
    if (!email) {
      alert("E-mail não encontrado.")
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/validar-recuperacao`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        codigo: data.codigo,
        novaSenha: data.novaSenha
      })
    })

    if (response.status === 200) {
      alert("Senha alterada com sucesso.")
      router.push("/login") // Redireciona para login após sucesso
    } else {
      alert("Código de recuperação inválido ou erro ao alterar a senha.")
    }
  }

  return (
    <section className="bg-orange-100 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Recuperação de Senha
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(enviarCodigoRecuperacao)}>
              <div>
                <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código de Recuperação:</label>
                <input type="text" id="codigo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite o código de recuperação" required {...register("codigo")} />
              </div>
              <div>
                <label htmlFor="novaSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nova Senha:</label>
                <input type="password" id="novaSenha" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sua nova senha" required {...register("novaSenha")} />
              </div>
              <button type="submit" className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Alterar Senha
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RecuperaSenha() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RecuperaSenhaComponent />
    </Suspense>
  )
}
