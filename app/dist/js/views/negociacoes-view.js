import { View } from "./view.js";
export class NegociacoesView extends View {
  template(model) {
    return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody id="negociacoes">
                ${model
                  .lista()
                  .map((negociacao) => {
                    return `
                        <tr>
                            <td>
                                ${this.formataData(negociacao.data)}
                            </td>
                            <td>
                                ${negociacao.quantidade}
                            </td>
                            <td>
                                ${negociacao.valor}
                            </td>
                        </tr>
                    `;
                  })
                  .join("")}
                </tbody>
            </table>
        `;
  }
  formataData(data) {
    return new Intl.DateTimeFormat().format(data);
  }
}
