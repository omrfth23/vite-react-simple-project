describe("Login Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form doldurulduğunda submit edebilirim", () => {
    cy.get('[data-cy="email"]').type("test@mail.com");
    cy.get('[data-cy="password"]').type("Strong123");
    cy.get('[data-cy="terms"]').check();

    cy.get('[data-cy="submit"]').should("not.be.disabled").click();
    cy.get('[data-cy="success"]').should("exist");
  });

  it("Email yanlış → 1 hata mesajı ve buton disabled", () => {
    cy.get('[data-cy="email"]').type("yanlisemail");
    cy.get('[data-cy="password"]').type("Strong123");

    cy.get('[data-cy="error"]').should("have.length", 1);
    cy.contains("Geçerli bir email giriniz").should("exist");
    cy.get('[data-cy="submit"]').should("be.disabled");
  });

  it("Email ve password yanlış → 2 hata mesajı", () => {
    cy.get('[data-cy="email"]').type("yanlis");
    cy.get('[data-cy="password"]').type("123");

    cy.get('[data-cy="error"]').should("have.length", 2);
    cy.contains("Şifre güçlü değil").should("exist");
  });

  it("Email ve password doğru ama şartlar kabul edilmedi", () => {
    cy.get('[data-cy="email"]').type("test@mail.com");
    cy.get('[data-cy="password"]').type("Strong123");

    cy.get('[data-cy="submit"]').should("be.disabled");
  });
});
