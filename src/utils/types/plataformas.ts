import { PlataformaJogoI } from "./jogos"

// Interface para plataformas
export interface PlataformaI {
  id: number
  nome: string
  jogos: PlataformaJogoI[]
}

