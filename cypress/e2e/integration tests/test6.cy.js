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

    // Step 1:Click on the "Place Order" button
    cy.get("button").contains("Place Order").click();

    // Step 2:Click on the "Terms & Conditions" button
    cy.get("a").contains("Terms & Conditions");

    // Step 3: Navigate to the 'Top Deals' section of the website.
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/policy");

    //  Step 4:See that the text is visible in the page for the terms and condition
    cy.get(".wrapperTwo").contains(
      "Here the terms and condition page Click to geo back "
    );

    cy.wait(2000);

    //  Step 4:Can go back in the home page
    cy.get(".wrapperTwo").get("a").contains("Home").click();
  });
});
