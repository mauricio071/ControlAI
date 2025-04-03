describe("Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("p").contains("Registre-se").click();
    cy.get("h4").contains("Registrar");
  });

  it.skip("should simulate a successful user registration", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=    CHAVE",
      {
        body: {},
      }
    ).as("registerMock");

    cy.findByLabelText("Digite o seu nome").type("Maurício");
    cy.findByLabelText("Digite o seu email").type("testefake0123@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("teste123");

    cy.get("button").click();
    cy.wait("@registerMock").its("response.body").should("be.equal", "Teste!");

    cy.get("#notistack-snackbar").contains("Conta criada com sucesso!");
  });

  it("should show error messages when the form fields are empty", () => {
    cy.get("button").click();

    cy.get("p").contains("Nome é obrigatório");
    cy.get("p").contains("Email é obrigatório");
    cy.get("p").contains("Mínimo 6 caracteres");
  });

  it("should show snackbar with error message when email has been duplicated", () => {
    cy.findByLabelText("Digite o seu nome").type("Maurício");
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("teste123");

    cy.get("button").click();

    cy.get("#notistack-snackbar").contains(
      "Esse email já está sendo utilizado!"
    );
  });
});
