beforeEach(() => {
    cy.visit(Cypress.env('url')); // URL to the homepage of the application
  });

// // Test Case ID: TC4_01
// // Test Case Title: Verify Top Deals Display

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
      // Prerequisite: Ensure the user is on the deals page
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    });
  
    it.only("ensures that the top deals list can be sorted correctly by price", () => {
      // Step 1: Click on the 'Price' column header in the top deals list.
      cy.get("th").contains("Price").click();
  
      // Expected Result: The list is sorted by price in ascending order.
      // Capture the first price after sorting to compare later
      cy.get("tbody tr").first().find("td").eq(1).invoke('text').then((text1) => {
        const firstPrice = parseFloat(text1);
  
        // Click on the 'Price' column header again to sort by descending order
        cy.get("th").contains("Price").click();
  
        // Expected Result: The list is sorted by price in descending order.
        // Capture the first price after re-sorting to compare
        cy.get("tbody tr").first().find("td").eq(1).invoke('text').should((text2) => {
          const secondPrice = parseFloat(text2);
          expect(secondPrice).to.be.lessThan(firstPrice); // Verify the price is now less than the first one, indicating descending order
        });
      });
    });
  });
  