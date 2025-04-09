import * as dayjs from "dayjs";

const date = dayjs().format("DD/MM/YYYY");
const currentYear = dayjs().year();

describe("Histórico", () => {
  beforeEach(() => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("testeE2E123");

    cy.get("button").contains("Entrar").click();
  });

  it("should delete a transaction from history", () => {
    cy.findByRole("button", { name: /adicionar transação/i }).click();

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
      .click();

    cy.get("#notistack-snackbar")
      .contains("Transação registrada com sucesso!")
      .then(() => {
        cy.findByRole("button", { name: /histórico/i }).click();

        cy.get('.MuiDataGrid-row--firstVisible > [data-field="actions"]')
          .find("button")
          .click();

        cy.contains("button", "Sim").click();
      });
  });

  it("should consult expense history graph for a different year", () => {
    cy.findByRole("button", { name: /histórico/i }).click();

    cy.findByLabelText("Ano do histórico de despesas").find("button").click();

    cy.contains(".MuiPickersYear-yearButton", currentYear - 1)
      .click()
      .then(() => {
        cy.findByLabelText("Ano do histórico de despesas")
          .find("input")
          .should("have.value", (currentYear - 1).toString());
      });
  });

  it("should consult income history graph for a different year", () => {
    cy.findByRole("button", { name: /histórico/i }).click();

    cy.findByLabelText("Ano do histórico de rendas").find("button").click();

    cy.contains(".MuiPickersYear-yearButton", currentYear - 1)
      .click()
      .then(() => {
        cy.findByLabelText("Ano do histórico de rendas")
          .find("input")
          .should("have.value", (currentYear - 1).toString());
      });
  });
});
