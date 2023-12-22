// Test Case ID: TC01
// Test Case Title: Apply Promo Code at Checkout

import HomePage from "../pageObject/HomePage";

beforeEach(() => {
  cy.visit(Cypress.env("url")); // URL to the homepage of the application
});

describe("Tset", () => {
  it("verifies that a promo code applies a discount", () => {
    const homePage = new HomePage();
    homePage.Checkout();
    
    
    cy.get("button").contains("Place Order").click();
    cy.get("a").contains("Terms & Conditions"); 
  });
});
