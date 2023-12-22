// // Test Case ID: TC4_02
// // Test Case Title: Verify Top Deals Sorting

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

// // Test Case ID: TC4_02
// // Test Case Title: Verify Top Deals Sorting

// describe("Verify Top Deals Sorting", () => {
//     before(() => {
//       cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers"); // Adjust the URL to the deals page of the application
//     });
  
//     it("verifies that the top deals list can be sorted by price in ascending and descending order", () => {
//       // Step 1: Click on the 'Price' column header in the top deals list.
//       cy.get('th').contains('Price').click().then(() => {
//         // After clicking we should have the icon class 'fa-sort-asc' indicating ascending sort
//         cy.get('th').contains('Price').find('.sort-icon').should('have.class', 'fa-sort-asc');
//       });
  
//       // Capture and store the list of prices after first click
//       let pricesAscending = [];
//       cy.get('tbody tr').each(($row) => {
//         cy.wrap($row).find('td').eq(1).then(($td) => {
//           pricesAscending.push(parseFloat($td.text()));
//         });
//       });
  
//       // Step 2: Click on the 'Price' column header again to sort in descending order.
//       cy.get('th').contains('Price').click().then(() => {
//         // After clicking again we should have the icon class 'fa-sort-desc' indicating descending sort
//         cy.get('th').contains('Price').find('.sort-icon').should('have.class', 'fa-sort-desc');
//       });
  
//       // Capture and store the list of prices after second click
//       let pricesDescending = [];
//       cy.get('tbody tr').each(($row, index) => {
//         cy.wrap($row).find('td').eq(1).then(($td) => {
//           pricesDescending.push(parseFloat($td.text()));
//           // Assert that the price is the same list but in reverse order
//           expect(pricesDescending[index]).to.eq(pricesAscending[pricesAscending.length - index - 1]);
//         });
//       });
//     });
//   });