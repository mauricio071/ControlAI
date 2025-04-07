describe("Chatbot", () => {
  beforeEach(() => {
    cy.findByLabelText("Digite o seu email").type("teste@gmail.com");
    cy.findByLabelText("Digite a sua senha").type("testeE2E123");

    cy.get("button").contains("Entrar").click();
  });

  it("should not return error when user types a message", () => {
    cy.findByLabelText("chatbot-btn").click();

    cy.wait(1450);

    cy.findByPlaceholderText("Faça a sua pergunta...").type(
      "Qual é meu saldo?"
    );
    cy.findByLabelText("enviar mensagem").click();

    cy.contains("p", "....").should("exist");

    cy.contains("p", "....")
      .should("not.exist")
      .then(() => {
        cy.contains("p", "Failed to fetch").should("not.exist");
        cy.contains("p", "Erro ao chamar API do Gemini").should("not.exist");
      });
  });
});
