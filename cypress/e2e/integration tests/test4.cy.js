
// // Test Case ID: TC4_01
// // Test Case Title: Verify Top Deals Display


describe("Verify Top Deals Display", () => {
    before(() => {
      // Adjust the URL to the homepage of the application
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    });
  
    it("ensures that the top deals are correctly displayed on the page", () => {
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

    it("ensures that the top deals list can be sorted correctly by price", () => {
      // Step 1: Wait for the 'Price' column header to be visible and click on it
      cy.contains("th", "Price").should("be.visible").click();

      // Expected Result: The list is sorted by price in ascending order.
      // Capture the first price after sorting to compare later
      cy.get("tbody tr").first().find("td").eq(1).invoke('text').then((text1) => {
        const firstPrice = parseFloat(text1);

        // Click on the 'Price' column header again to sort by descending order
        cy.contains("th", "Price").should("be.visible").click();

        // Expected Result: The list is sorted by price in descending order.
        // Capture the first price after re-sorting to compare
        cy.get("tbody tr").first().find("td").eq(1).invoke('text').should((text2) => {
          const secondPrice = parseFloat(text2);
          expect(firstPrice).to.be.lessThan(secondPrice); // Verify the price is now less than the first one, indicating descending order
        });
      });
    });
  });

// Test Case ID: TC4_03
// Test Case Ensure that pagination is functioning correctly in the top deals section.	
  

describe("Verify Pagination of Top Deals", () => {
  before(() => {
    
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  it("ensures that pagination is functioning correctly", () => {
    
    
    cy.get('a[aria-label="Next"]').click();

    cy.wait(1000);
    
    cy.get('.pagination .active a').invoke('text').then((text) => {
      const currentPageNumber = parseInt(text, 10);
      cy.wait(1000);
      
      expect(currentPageNumber).to.be.greaterThan(1);
      cy.wait(1000);
      
      cy.get('tbody tr').first().find('td').first().invoke('text').should((newFirstDeal) => {
        expect(newFirstDeal).to.not.equal('Wheat');
      });
    });
  });
  
});
  
// Test Case ID: TC4_04
// Test Case Title:  Ensure that the user can filter the top deals list.	

describe("Verify Top Deals Filtering with Search Bar", () => {
  before(() => {
    // Prerequisite: Ensure the user is on the deals page
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  it("ensures that the user can filter the top deals list with the search bar", () => {
    // Step 1: Enter a search term in the search field in the top deals section.
    const searchTerm = 'Mango'; // Replace with a valid search term
    cy.get('#search-field').type(`${searchTerm}{enter}`);

    // Expected Result: The list of top deals is filtered.
    cy.get('tbody tr').each(($row) => {
      // Assuming that the first column contains the name of the item
      cy.wrap($row).find('td').first().should('contain', searchTerm);
    });

    // Optional: Check if there are any rows that do not contain the search term (should be none)
    cy.get('tbody tr').not(`:contains("${searchTerm}")`).should('have.length', 0);
  });
});

// Test Case ID: TC4_05
// Test Case Title: Ensure that the user can filter the top deals list.

describe("Verify Top Deals Filtering with Search Bar", () => {
  before(() => {
    // Prerequisite: Ensure the user is on the deals page
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  it("ensures that the user can filter the top deals list with the search bar", () => {
    // Step 1: Enter a search term in the search field in the top deals section.
    const searchTerm = 'Mango'; 
    cy.get('#search-field').type(`${searchTerm}{enter}`);

    // Expected Result: The list of top deals is filtered.
    cy.get('tbody tr').each(($row) => {
      // Assuming that the first column contains the name of the item
      cy.wrap($row).find('td').first().should('contain', searchTerm);
    });

    cy.get('tbody tr').not(`:contains("${searchTerm}")`).should('have.length', 0);
  });
});