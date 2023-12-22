class HomePage {
  visitHomePage() {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  }

  addProductToCart() {
    cy.wait(2000);
    cy.get(".products .product").first().contains("Brocolli - 1 Kg");
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "0");
      cy.get("strong").eq(1).should("contain", "0");
    });
    cy.get(".products .product")
      .first()
      .get("button")
      .contains("ADD TO CART")
      .click();
  }

  Checkout() {
    cy.wait(2000);
    cy.get(".products .product").first().contains("Brocolli - 1 Kg");
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "0");
      cy.get("strong").eq(1).should("contain", "0");
    });
    cy.get(".products .product")
      .first()
      .get("button")
      .contains("ADD TO CART")
      .click();

    cy.get(".cart-icon").click();
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-item").should("have.length", 1);
      cy.get(".product-name").should("contain", "Brocolli - 1 Kg");
      cy.get(".product-price").should("contain", "120");
    });

    cy.get(".action-block")
      .contains("PROCEED TO CHECKOUT")
      .should("be.visible")
      .click();
  }
}

export default HomePage;
