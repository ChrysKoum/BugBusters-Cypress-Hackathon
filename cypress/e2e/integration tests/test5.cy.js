// Test Case ID: TC01
// Test Case Title: Apply Promo Code at Checkout

import HomePage from "../pageObject/HomePage";

beforeEach(() => {
  cy.visit(Cypress.env("url"));
});

describe("Apply Promo Code at Checkout", () => {

  const promoCodes = ["DISCOUNT20", "SAVE10", "SUMMER25", "FREESHIP"];

  it("verifies that different promo codes apply discounts", () => {
    const homePage = new HomePage();
    homePage.Checkout();

    for (let i = 0; i < promoCodes.length; i++) {
      const promoCode = promoCodes[i];

      // Action: Enter the promo code and click 'Apply'.
      cy.get(".promoCode").clear().type(promoCode);
      cy.get(".promoBtn").click();

      // Expected Result: The discount is applied, and the total amount is updated to reflect the discount.
      cy.get(".discountPerc").should("contain", getDiscountPercentage(promoCode));
      cy.get(".discountAmt").should((discountAmt) => {
        expect(discountAmt.text()).not.to.equal('0');
      });
      cy.get(".totAmt").should((totalAmt) => {
        const discountedPrice = parseFloat(totalAmt.text());
        const originalPrice = parseFloat(cy.get(".product-price").invoke('text'));
        expect(discountedPrice).to.be.lessThan(originalPrice);
      });
    }
  });

  function getDiscountPercentage(promoCode) {
    // Add logic to retrieve the discount percentage based on the promo code
    // For example, you can use a switch statement or an API call to get the discount percentage
    switch (promoCode) {
      case "DISCOUNT20":
        return "20%";
      case "SAVE10":
        return "10%";
      case "SUMMER25":
        return "25%";
      case "FREESHIP":
        return "Free Shipping";
      default:
        return "";
    }
  }

});

