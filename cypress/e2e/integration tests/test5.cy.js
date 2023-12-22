// Test Case ID: TC01
// Test Case Title: Apply Promo Code at Checkout

import HomePage from "../pageObject/HomePage";

beforeEach(() => {
  cy.visit(Cypress.env("url")); // URL to the homepage of the application
});

describe("Apply Promo Code at Checkout", () => {
  it("verifies that a promo code applies a discount", () => {
    const homePage = new HomePage();
    homePage.Checkout();
    // Test Step ID: 2.1
    // Action: Enter a valid promo code and click 'Apply'.
    cy.get(".promoCode").type("DISCOUNT20"); // Replace 'DISCOUNT20' with the actual promo code
    cy.get(".promoBtn").click();

    // Expected Result: The discount is applied, and the total amount is updated to reflect the discount.
    cy.get(".discountPerc").should("contain", "20%"); // Assuming the promo code gives a 20% discount
    cy.get(".discountAmt").should((discountAmt) => {
      expect(discountAmt.text()).not.to.equal('0'); // Verify the discount amount is not '0'
    });
    cy.get(".totAmt").should((totalAmt) => {
      const discountedPrice = parseFloat(totalAmt.text());
      const originalPrice = parseFloat(cy.get(".product-price").invoke('text'));
      expect(discountedPrice).to.be.lessThan(originalPrice); // Verify that the total amount is less than the original price
    });
  });
});

