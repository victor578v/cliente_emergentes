"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/context/cliente"

type Inputs = {
    nome: string
    email: string
    senha: string
    repeteSenha: string
    termos: boolean
}

export default function Cadastro() {
    const { register, handleSubmit } = useForm<Inputs>()
    const router = useRouter()

    async function registraCliente(data: Inputs) {
        // Verifica se as senhas são iguais
        if (data.senha !== data.repeteSenha) {
            alert("As senhas não coincidem!")
            return;
        }

        if (!data.termos) {
            alert("Você deve aceitar os termos de responsabilidade para se cadastrar.")
            return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/cadastrar`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ nome: data.nome, email: data.email, senha: data.senha })
        })

        if (response.status === 201) {
            alert("Cadastrado com sucesso!")
        } else {
            alert("Erro ao cadastrar. Tente novamente.")
        }
    }

    return (
        <section className="bg-orange-100 dark:bg-gray-900">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Crie sua conta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(registraCliente)}>
                            <div>
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome:</label>
                                <input type="nome" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="José Carlos"
                                    required
                                    {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com"
                                    required
                                    {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
                                <input type="password" id="senha" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("senha")} />
                            </div>
                            <div>
                                <label htmlFor="repeteSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repita sua senha:</label>
                                <input type="password" id="repeteSenha" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("repeteSenha")} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="termos" aria-describedby="termos" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                            {...register("termos")} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="termos" className="text-gray-500 dark:text-gray-300">
                                            Aceito os termos de responsabilidade
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Criar conta</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Já possui uma conta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Entre</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
