describe("Login", () => {
  it("should login with an existent account", () => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("testeE2E123");

    cy.get("button").contains("Entrar").click();

    cy.get("#notistack-snackbar").contains("Login realizado com sucesso!");
  });

  it("should show error message when login with empty fields", () => {
    cy.get("button").contains("Entrar").click();

    cy.get("p").contains("Email é obrigatório");
    cy.get("p").contains("Mínimo 6 caracteres");
  });
});

describe("Logout", () => {
  it("should logout when click the logout button", () => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("testeE2E123");

    cy.get("button").contains("Entrar").click();

    cy.get("#notistack-snackbar").contains("Login realizado com sucesso!");

    cy.get("#long-button").click();
    cy.get("li").contains("Sair").click();

    cy.get("h4").contains("Login");
  });
});
