import HomePage from "../pageObject/HomePage";

beforeEach(() => {
  cy.visit(Cypress.env('url')); // URL to the homepage of the application
});
