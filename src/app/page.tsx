'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemJogos } from "@/components/ItemJogo"; // Atualizar para o componente de item de jogo
import { JogoI } from "@/utils/types/jogos"; // Atualizar para o tipo de jogo
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [jogos, setJogos] = useState<JogoI[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {

    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    }

    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos`)
      const dados = await response.json()
      console.log(dados)
      setJogos(dados)
    }
    getDados()
  }, [])

  const listaJogos = jogos.map(jogo => (
    <ItemJogos data={jogo} key={jogo.id} /> // Atualizar para o componente de item de jogo
  ))

  return (
    <>
      <InputPesquisa setJogos={setJogos} /> {/* Atualizar para setJogos */}
      <div className="mx-auto max-w-screen-xl">
        <h1 className="mt-2 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Jogos <span className="underline underline-offset-3 decoration-8 decoration-purple-400 dark:decoration-purple-600">em destaque</span>
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaJogos}
        </section>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

