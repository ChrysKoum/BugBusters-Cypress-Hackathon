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
  
      // Alias the table for easier reference
      cy.get(".products").find(".table-bordered").as("dealsTable");
      
      // Ensure the table is visible
      cy.get("@dealsTable").should("be.visible");
  
      // Check the number of rows in the table - expecting more than 1 row (header row + data rows)
      cy.get("@dealsTable").find("tbody tr").should("have.length.at.least", 1);
  
      // Verify the headers of the table
      cy.get("@dealsTable").find("thead tr").first().within(() => {
        cy.get("th").eq(0).should("contain", "Veg/fruit name");
        cy.get("th").eq(1).should("contain", "Price");
        cy.get("th").eq(2).should("contain", "Discount price");
      });
  
      // Verify that each row contains the expected data
      cy.get("@dealsTable").find("tbody tr").each(($row) => {
        cy.wrap($row).find("td").should("have.length", 3); // Each row should have 3 cells
      });
    });
  });
  

// Test Case ID: TC4_02
// Test Case Title: Verify Top Deals Sorting

describe("Verify Top Deals Sorting", () => {
    before(() => {
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers"); // Adjust the URL to the deals page of the application
    });
  
    it("verifies that the top deals list can be sorted by price in ascending and descending order", () => {
      // Step 1: Click on the 'Price' column header in the top deals list.
      cy.get('th').contains('Price').click().then(() => {
        // After clicking we should have the icon class 'fa-sort-asc' indicating ascending sort
        cy.get('th').contains('Price').find('.sort-icon').should('have.class', 'fa-sort-asc');
      });
  
      // Capture and store the list of prices after first click
      let pricesAscending = [];
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(1).then(($td) => {
          pricesAscending.push(parseFloat($td.text()));
        });
      });
  
      // Step 2: Click on the 'Price' column header again to sort in descending order.
      cy.get('th').contains('Price').click().then(() => {
        // After clicking again we should have the icon class 'fa-sort-desc' indicating descending sort
        cy.get('th').contains('Price').find('.sort-icon').should('have.class', 'fa-sort-desc');
      });
  
      // Capture and store the list of prices after second click
      let pricesDescending = [];
      cy.get('tbody tr').each(($row, index) => {
        cy.wrap($row).find('td').eq(1).then(($td) => {
          pricesDescending.push(parseFloat($td.text()));
          // Assert that the price is the same list but in reverse order
          expect(pricesDescending[index]).to.eq(pricesAscending[pricesAscending.length - index - 1]);
        });
      });
    });
  });