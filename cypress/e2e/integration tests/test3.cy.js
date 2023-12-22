beforeEach(() => {
  cy.visit(Cypress.env('url')); // URL to the homepage of the application
});

// Test Case ID: TC03_01
// Test Case Title: Search Product by Full Name

describe("Search Product by Full Name", () => {
  it.only("ensures that the search functionality returns correct products when searching by product name", () => {
    // Step 1: Enter 'Brocolli' in the search bar.
    cy.get('.search-keyword').type('Brocolli');

    // Step 2: Press the 'Search' button or hit enter.
    cy.get('.search-button').click();

    // Verify the search result contains the product 'Brocolli - 1 Kg'.
    cy.get('.products').find('.product').each(($el) => {
      const text = $el.find('h4.product-name').text();
      if (text.includes('Brocolli - 1 Kg')) {
        expect(text).to.contain('Brocolli - 1 Kg');
      }
    });
  });
});

// Test Case ID: TC3_02
// Test Case Title: Search Product by Partial Name

describe("Search Product by Partial Name", () => {
  it.only("ensures the search functionality can handle partial product names", () => {
    // Step 1: Enter 'Broc' in the search bar.
    cy.get('.search-keyword').type('Broc');
    cy.get('.search-button').click();

    // Assert that 'Brocolli - 1 Kg' is displayed in the search results.
    cy.get('.products').find('.product').should('contain', 'Brocolli - 1 Kg');
  });
});

// Test Case ID: TC3_03
// Test Case Title: Search with No Results

describe("Search with No Results", () => {
  it.only("ensures that a no results message is displayed when no products match the search term", () => {
    // Step 1: Enter a non-existent product name, like 'Dragonfruit', in the search bar.
    cy.get('.search-keyword').type('Dragonfruit');
    cy.get('.search-button').click();

    // Expected Result: A message indicating 'Sorry, no products matched your search!' or similar is displayed.
    cy.get('.products-wrapper').should('contain', 'Sorry, no products matched your search!');
  });
});

// Test Case ID: TC3_04
// Test Case Title: Case Insensitive Search

describe("Case Insensitive Search", () => {
  it.only("verifies that the search functionality is not case-sensitive", () => {
    // Step 1: Enter 'broccoli' in lowercase in the search bar.
    cy.get('.search-keyword').type('broccoli');
    cy.get('.search-button').click();

    // Verifying the product 'Broccoli - 1 Kg' is displayed in the search results, regardless of case.
    cy.get('.products').find('.product').each(($el) => {
      const text = $el.find('h4.product-name').text();
      if (text.toLowerCase().includes('broccoli')) {
        expect($el.find('h4.product-name')).to.contain('Broccoli - 1 Kg');
      }
    });
  });
});

// Test Case ID: TC3_05
// Test Case Title: Search with Special Characters
describe("Search with Special Characters", () => {
  it.only("ensures that the search functionality can handle special characters", () => {
    // Step 1: Enter 'Broc!' in the search bar.
    cy.get('.search-keyword').type('Broc!');
    cy.get('.search-button').click();

    // Expected Result: The search results should contain 'Brocolli - 1 Kg'.
    cy.get('.products').find('.product').should('contain', 'Brocolli - 1 Kg');
  });
});