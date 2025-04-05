import * as dayjs from "dayjs";

import { FormatarParaMoeda } from "../../src/shared/utils/FormatarMoeda";

const date = dayjs().format("DD/MM/YYYY");

describe("Add new transaction", () => {
  beforeEach(() => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("testeE2E123");

    cy.get("button").contains("Entrar").click();

    cy.findByRole("button", { name: /adicionar transação/i }).click();
  });

  it("should add new transaction with positive value", () => {
    let initialBalance = 0;

    cy.contains("h4", "R$")
      .invoke("text")
      .then((text) => {
        initialBalance = FormatarParaMoeda(text);
      });

    cy.get(".MuiToggleButtonGroup-firstButton").click();

    cy.findByLabelText("Selecione a data").type(date);
    cy.findByLabelText("Descrição").type("Teste");
    cy.findByLabelText("Categoria").click();
    cy.contains("li", "Salário")
      .click()
      .then(() => {
        cy.findByLabelText("Valor").type("1000");
      });

    cy.get("button")
      .contains(/salvar/i)
      .click()
      .then(() => {
        cy.get("#notistack-snackbar").contains(
          "Transação registrada com sucesso!"
        );

        cy.contains("h4", "R$")
          .invoke("text")
          .then((text) => {
            const finalBalance = FormatarParaMoeda(text);
            expect(finalBalance).to.be.greaterThan(initialBalance);
          });
      });
  });

  it("should add new transaction with negative value", () => {
    let initialBalance = 0;

    cy.contains("h4", "R$")
      .invoke("text")
      .then((text) => {
        initialBalance = FormatarParaMoeda(text);
      });

    cy.get(".MuiToggleButtonGroup-lastButton").click();

    cy.findByLabelText("Selecione a data").type(date);
    cy.findByLabelText("Descrição").type("Teste");
    cy.findByLabelText("Categoria").click();
    cy.contains("li", "Alimentação")
      .click()
      .then(() => {
        cy.findByLabelText("Valor").type("1000");
      });

    cy.get("button")
      .contains(/salvar/i)
      .click()
      .then(() => {
        cy.get("#notistack-snackbar").contains(
          "Transação registrada com sucesso!"
        );

        cy.contains("h4", "R$")
          .invoke("text")
          .then((text) => {
            const finalBalance = FormatarParaMoeda(text);
            expect(initialBalance).to.be.greaterThan(finalBalance);
          });
      });
  });

  it("should show error messages when send form with empty fields", () => {
    cy.get("button")
      .contains(/salvar/i)
      .click();

    cy.get("span").contains("Tipo é obrigatório");
    cy.get("span").contains("Data é obrigatória");
    cy.get("span").contains("Descrição é obrigatória");
    cy.get("span").contains("Categoria é obrigatória");
    cy.get("span").contains("Valor é obrigatório");
  });
});
