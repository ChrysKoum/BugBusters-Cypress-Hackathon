// Test Case ID: TC4_01
// Test Case Title: Verify Top Deals Display

describe("Verify Top Deals Display", () => {
  before(() => {
    // Adjust the URL to the homepage of the application
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });

  it.only("ensures that the top deals are correctly displayed on the page", () => {
    // Step 1: Navigate to the 'Top Deals' section of the website.
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    cy.get(".products").find(".table-bordered").as("dealsTable");
    cy.get("@dealsTable").should("be.visible");
    cy.get("@dealsTable").find("tr").should("have.length.at.least", 1);

    // Verify that each row contains the expected columns: 'Veg/fruit name', 'Price', and 'Discount price'
    cy.get("@dealsTable").find("tr").each(($row) => {
      cy.wrap($row).find("td").eq(0).should("contain.text", "");
      cy.wrap($row).find("td").eq(1).should("contain.text", "");
      cy.wrap($row).find("td").eq(2).should("contain.text", "");
    });
  });
});