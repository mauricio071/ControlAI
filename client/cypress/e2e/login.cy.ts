describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should login with an existent account", () => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("teste123");

    cy.get("button").contains("Entrar").click();

    cy.get("#notistack-snackbar").contains("Login realizado com sucesso!");
  });

  it("should show error message when login with empty fields", () => {
    cy.get("button").contains("Entrar").click();

    cy.get("p").contains("Email é obrigatório");
    cy.get("p").contains("Mínimo 6 caracteres");
  });
});
