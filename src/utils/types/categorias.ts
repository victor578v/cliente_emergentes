import { JogoI } from "./jogos"

// Interface para categorias
export interface CategoriaI {
  id: number
  nome: string
  jogos: JogoI[]
}
