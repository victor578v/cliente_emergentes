"use client"
import { JogoI } from "@/utils/types/jogos";
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";

export function ItemJogos({ data }: { data: JogoI }) {
  const { cliente } = useClienteStore();

  // Função para simular a compra e adicionar o jogo para o usuário
  async function handleCompra() {
    if (!data) return; // Garantir que o jogo existe antes de tentar comprar

    if (!cliente) {
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
          jogoId: data.id, // O ID do jogo sendo comprado
        }),
      });

      if (response.ok) {
        alert(`Obrigado por comprar o jogo "${data.titulo}" na nossa loja!`);
      } else {
        alert("Erro ao realizar a compra.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao realizar a compra.");
    }
  }

  return (
    <div className="mt-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg"
        src={data.imagem || '/default-image.png'}
        alt={`Imagem do ${data.titulo}`}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.titulo}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Categoria: {data.categoria.nome}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Desenvolvedora: {data.desenvolvedora.nome}
        </p>
        <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
          Preço R$ {Number(data.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
        </p>
        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
          {data.descricao || 'Sem descrição disponível'}
        </p>
        <div className="flex space-x-4">
          <Link
            href={`/detalhes/${data.id}`}
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver detalhes
          </Link>
          <button
            onClick={handleCompra}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
