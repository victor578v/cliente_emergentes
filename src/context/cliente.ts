import { create } from 'zustand';
import { ClienteI } from '@/utils/types/clientes';

// Defina um valor inicial para o cliente
const clienteInicial: ClienteI = {
  id: '', // ou um valor padrão que faça sentido
  nome: '',
  email: '',
  // Adicione outras propriedades necessárias com valores padrão, se houver
};

type ClienteStore = {
  cliente: ClienteI;
  logaCliente: (clienteLogado: ClienteI) => void;
  deslogaCliente: () => void;
};

export const useClienteStore = create<ClienteStore>((set) => ({
  cliente: clienteInicial,
  logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),
  deslogaCliente: () => set({ cliente: clienteInicial }), // Reseta para o valor inicial
}));
