'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { JogoI } from "@/utils/types/jogos";


interface ClienteJogoResponse {
    clienteId: number;
    jogoId: number;
    jogo: JogoI; // Aqui, use a interface correta que você já definiu para Jogo
}

export default function Jogos() {
    const [jogos, setJogos] = useState<JogoI[]>([]);
    const { cliente, logaCliente } = useClienteStore(); // Certifique-se de que o 'cliente' é importado corretamente

    useEffect(() => {
        async function buscaCliente(idCliente: string) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`);
            if (response.status == 200) {
                const dados = await response.json();
                logaCliente(dados);
            }
        }

        if (localStorage.getItem("client_key")) {
            const idClienteLocal = localStorage.getItem("client_key") as string;
            buscaCliente(idClienteLocal);
        }
    }, []); // Esta useEffect deve rodar uma única vez para buscar o cliente

    useEffect(() => {
        async function buscaDados() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}/jogos`);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
    
                const dados: ClienteJogoResponse[] = await response.json();
                const jogosExtraidos = await Promise.all(dados.map(async (item) => {
                    const jogo = item.jogo;
    
                    // Obtenha os dados da desenvolvedora usando desenvolvedoraId
                    const desenvolvedoraResponse = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/desenvolvedoras/${jogo.desenvolvedoraId}`);
                    const desenvolvedoraData = await desenvolvedoraResponse.json();
    
                    // Adicione os dados da desenvolvedora ao objeto jogo
                    return {
                        ...jogo,
                        desenvolvedora: desenvolvedoraData // Adiciona a desenvolvedora ao jogo
                    };
                }));
    
                setJogos(jogosExtraidos);
            } catch (error) {
                console.error("Erro ao buscar jogos:", error);
            }
        }
    
        if (cliente.id) {
            buscaDados();
        }
    }, [cliente.id]);

    // Função para formatar a data (AAA-MM-DD para DD/MM/AAAA)
    function dataDMA(data: string) {
        const ano = data.substring(0, 4);
        const mes = data.substring(5, 7);
        const dia = data.substring(8, 10);
        return dia + "/" + mes + "/" + ano;
    }

    const jogosTable = jogos.map(jogo => (
        <tr key={jogo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
                <img src={jogo.imagem} className="fotoJogo" alt="Imagem do Jogo" />
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {jogo.titulo}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {jogo.desenvolvedora ? jogo.desenvolvedora.nome : "Desenvolvedora desconhecida"} {/* Verificação explícita */}
            </td>
            <td className="px-6 py-4">
                <p><b>{jogo.descricao}</b></p>
                <p><i>Lançado em: {dataDMA(typeof jogo.lancamento === 'string' ? jogo.lancamento : jogo.lancamento.toISOString())}</i></p>
            </td>
        </tr>
    ));
    

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Meus<span className="underline underline-offset-3 decoration-8 decoration-purple-400 dark:decoration-purple-600"> Jogos</span>
            </h1>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Imagem</th>
                        <th scope="col" className="px-6 py-3">Nome</th>
                        <th scope="col" className="px-6 py-3">Desenvolvedora</th>
                        <th scope="col" className="px-6 py-3">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {jogosTable}
                </tbody>
            </table>
        </section>
    );

}
