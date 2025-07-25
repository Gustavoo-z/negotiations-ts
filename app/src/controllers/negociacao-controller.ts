import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
  @domInjector("#data")
  private inputData: HTMLInputElement;
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInjector("#valor")
  private inputValor: HTMLInputElement;
  private negociacoes: Negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempoDeExecucao(true)
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value,
    );
    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas negociações em dias úteis são aceitas.");
      return;
    }
    this.negociacoes.adiciona(negociacao);
    imprimir(negociacao, this.negociacoes);
    this.atualizaView();
    this.limpaFormulario();
  }

  public importaDados(): void {
    this.negociacoesService.obterNegociacoesDoDia()
    .then(negociacoes => {
      return negociacoes.filter(negociacaoDeHoje => {
        return !this.negociacoes
          .lista()
          .some(negociacao => negociacao
            .ehIgual(negociacaoDeHoje)
          );
      })
    })
    .then((negociacoes) => {
      negociacoes.forEach((negociacao) => {
        this.negociacoes.adiciona(negociacao);
      });
      this.negociacoesView.update(this.negociacoes);
    });
  }

  private ehDiaUtil(data: Date): boolean {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
    );
  }

  private limpaFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
