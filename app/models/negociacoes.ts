import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }
}

const negociacoes = new Negociacoes();
negociacoes.lista().forEach(n => {
    console.log(n.data, n.quantidade, n.valor, n.volume);
});