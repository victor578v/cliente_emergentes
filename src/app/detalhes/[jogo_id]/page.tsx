"use client"
import { useClienteStore } from "@/context/cliente";
import { JogoI } from "@/utils/types/jogos";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Detalhes() {
  const params = useParams()

  const [jogo, setJogo] = useState<JogoI | null>(null);  // Inicialize como null
  const { cliente } = useClienteStore();

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos/${params.jogo_id}`)
      const dados = await response.json()
      setJogo(dados)
    }
    getDados()
  }, [params.jogo_id])

  async function handleCompra() {
    if (!jogo) return; // Garantir que o jogo existe antes de tentar comprar

    console.log(cliente)

    if (cliente.id == "") {
      alert("Você precisa de uma conta para comprar um jogo.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/comprar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clienteId: cliente.id, // O ID do cliente logado
          jogoId: jogo.id, // O ID do jogo sendo comprado
        }),
      });

      if (response.ok) {
        alert(`Obrigado por comprar o jogo "${jogo.titulo}" na nossa loja!`);
      } else {
        alert("Erro ao realizar a compra.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao realizar a compra.");
    }
  }

  if (!jogo) {
    return <div>Carregando...</div>;  // Adiciona uma mensagem de carregamento
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
        Detalhes do{" "}
        <span className="underline underline-offset-8 decoration-4 decoration-orange-400 dark:decoration-orange-600">
          {jogo.titulo}
        </span>
      </h1>

      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex items-center">
          <img 
            className="w-full h-96 object-cover md:w-1/2 md:h-auto md:rounded-l-lg" 
            src={jogo.imagem} 
            alt="Imagem do Jogo" 
          />

          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{jogo.titulo}</h2>

            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Categoria</h3>
                <p className="text-xl text-gray-900 dark:text-white">{jogo.categoria.nome}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Desenvolvedora</h3>
                <p className="text-xl text-gray-900 dark:text-white">{jogo.desenvolvedora.nome}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Preço</h3>
                <p className="text-xl text-gray-900 dark:text-white">
                  R$ {Number(jogo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Lançamento</h3>
                <p className="text-xl text-gray-900 dark:text-white">
                  {new Date(jogo.lancamento || "Sem data informada").toLocaleDateString("pt-br")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Plataformas</h3>
                <p className="text-xl text-gray-900 dark:text-white">
                  {jogo.plataformas.map(plataforma => plataforma.nome).join(', ')}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleCompra}
                className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
              >
                Comprar agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
