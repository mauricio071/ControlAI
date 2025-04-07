import * as dayjs from "dayjs";

import { FormatarParaMoeda } from "../../src/shared/utils/FormatarMoeda";

const date = dayjs().format("DD/MM/YYYY");
const tomorrowDay = dayjs().add(1, "day").format("DD/MM/YYYY");

describe("Minhas financas", () => {
  beforeEach(() => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("testeE2E123");

    cy.get("button").contains("Entrar").click();

    cy.findByRole("button", { name: /minhas finanças/i }).click();
  });

  describe("Gerenciamento de saldo", () => {
    it("should update balance with positive value", () => {
      let initialBalance = 0;

      cy.contains("h4", "R$")
        .first()
        .invoke("text")
        .then((text) => {
          initialBalance = FormatarParaMoeda(text);

          cy.contains("button", "edit").click();
          cy.findByLabelText("Valor").type("1000");

          cy.get("button").contains("Salvar").click();

          cy.get("#notistack-snackbar").contains(
            "Saldo atualizado com sucesso!"
          );

          cy.contains("h4", "R$")
            .first()
            .invoke("text")
            .then((text) => {
              const finalBalance = FormatarParaMoeda(text);
              expect(finalBalance).to.be.greaterThan(initialBalance);
            });
        });
    });

    it("should update balance with negative value", () => {
      let initialBalance = 0;

      cy.contains("h4", "R$")
        .first()
        .invoke("text")
        .then((text) => {
          initialBalance = FormatarParaMoeda(text);

          cy.contains("button", "edit").click();

          cy.get(".MuiToggleButtonGroup-lastButton").click();
          cy.findByLabelText("Valor").type("1000");

          cy.get("button").contains("Salvar").click();

          cy.get("#notistack-snackbar").contains(
            "Saldo atualizado com sucesso!"
          );

          cy.contains("h4", "R$")
            .first()
            .invoke("text")
            .then((text) => {
              const finalBalance = FormatarParaMoeda(text);
              expect(initialBalance).to.be.greaterThan(finalBalance);
            });
        });
    });

    it("should render snackbar with error message as 'Saldo insuficiente'", () => {
      let initialBalance = 0;

      cy.contains("h4", "R$")
        .first()
        .invoke("text")
        .then((text) => {
          initialBalance = FormatarParaMoeda(text.replace("R$ ", "")) + 1;

          cy.contains("button", "edit").click();

          cy.get(".MuiToggleButtonGroup-lastButton").click();

          cy.then(() => {
            const balanceString = initialBalance.toString();

            cy.findByLabelText("Valor").type(balanceString);
          });

          cy.get("button").contains("Salvar").click();

          cy.get("#notistack-snackbar").contains("Saldo insuficiente");
        });
    });
  });

  describe("Gerenciamento de rendas", () => {
    it("should add a new monthly income", () => {
      cy.contains("button", /adicionar renda/i)
        .click()
        .then(() => {
          cy.get("h2").contains("Adicionar renda").should("exist");
          cy.findByLabelText("Data de início do recebimento", {
            timeout: 300,
          }).type(date);
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

          cy.get("#notistack-snackbar").contains(
            "Nova renda registrada com sucesso!"
          );
        });
    });

    it("should edit an existent monthly income", () => {
      cy.findAllByLabelText("Editar renda")
        .first()
        .click()
        .then(() => {
          cy.get("h2").contains("Editar renda").should("exist");
          cy.findByLabelText("Data de início do recebimento", { timeout: 300 })
            .clear()
            .type(tomorrowDay);
          cy.findByLabelText("Descrição").clear().type("TesteUpdate");
          cy.findByLabelText("Categoria").click();
          cy.contains("li", "Investimento")
            .click()
            .then(() => {
              cy.findByLabelText("Valor").clear().type("2000");
            });

          cy.get("button")
            .contains(/salvar/i)
            .click();

          cy.get("#notistack-snackbar").contains(
            "Renda atualizada com sucesso!"
          );
        });
    });

    it("should delete an existent monthly income", () => {
      cy.get('.MuiDataGrid-row--firstVisible > [data-field="actions"]')
        .find("button")
        .contains("delete")
        .click();

      cy.get("button").contains(/sim/i).click();

      cy.get("#notistack-snackbar").contains("Deletado com sucesso!");
    });
  });

  describe("Gerenciamento de gastos", () => {
    it("should add a new monthly expense", () => {
      cy.contains("button", /adicionar gasto/i)
        .click()
        .then(() => {
          cy.get("h2").contains("Adicionar gasto").should("exist");
          cy.findByLabelText("Data de início do pagamento", {
            timeout: 300,
          }).type(date);
          cy.findByLabelText("Descrição").type("Teste");
          cy.findByLabelText("Categoria").click();
          cy.contains("li", "Alimentação")
            .click()
            .then(() => {
              cy.findByLabelText("Valor").type("1000");
            });

          cy.get("button")
            .contains(/salvar/i)
            .click();

          cy.get("#notistack-snackbar").contains(
            "Novo gasto registrado com sucesso!"
          );
        });
    });

    it("should edit an existent monthly expense", () => {
      cy.findAllByLabelText("Editar gasto")
        .first()
        .click()
        .then(() => {
          cy.get("h2").contains("Editar gasto").should("exist");
          cy.findByLabelText("Data de início do pagamento", { timeout: 300 })
            .clear()
            .type(tomorrowDay);
          cy.findByLabelText("Descrição").clear().type("TesteUpdate");
          cy.findByLabelText("Categoria").click();
          cy.contains("li", "Transporte")
            .click()
            .then(() => {
              cy.findByLabelText("Valor").clear().type("2000");
            });

          cy.get("button")
            .contains(/salvar/i)
            .click();

          cy.get("#notistack-snackbar").contains(
            "Gasto atualizado com sucesso!"
          );
        });
    });

    it("should delete an existent monthly expense", () => {
      cy.get('.MuiDataGrid-row--firstVisible > [data-field="actions"]')
        .last()
        .find("button")
        .contains("delete")
        .click();

      cy.get("button").contains(/sim/i).click();

      cy.get("#notistack-snackbar").contains("Deletado com sucesso!");
    });
  });
});
