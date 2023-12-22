import HomePage from "../pageObject/HomePage";

beforeEach(() => {
  cy.visit(Cypress.env('url')); // URL to the homepage of the application
});

// Test Case ID: TC01
// Test Case Title: Review Shopping Cart and Proceed to Checkout

describe("Complete Order for the products in the cart", () => {


  it("Review Shopping Cart and Proceed to Checkout", () => {

    const homePage = new HomePage();
    // Step 1: Add a product to the cart.
    homePage.addProductToCart();

    cy.get(".cart-icon").click();
    cy.get(".cart-preview").within(() => {
        cy.get(".cart-item").should("have.length", 1);
        cy.get(".product-name").should("contain", "Brocolli - 1 Kg");
        cy.get(".product-price").should("contain", "120");
    });

    cy.get(".action-block")
        .contains("PROCEED TO CHECKOUT")
        .should("be.visible")
        .click();
    cy.url()
      .should("include", "/seleniumPractise/#/cart");  
  });
});

// Test Case ID: TC02
// Test Case Title: Select Country and Agree to Terms and Conditions

describe("Complete Order for the products in the cart", () => {


  it("Select Country and Agree to Terms and Conditions", () => {
    const homePage = new HomePage();
    // Prerequisite: Go to the checkout page.
    homePage.Checkout();
    cy.get("button").contains("Place Order").click();

    // Step 1: Select a country from the dropdown menu.
    cy.get("select").select("India").should("have.value", "India");

    // Step 2: Check the 'Agree to the Terms & Conditions' checkbox and click 'Proceed'.
    cy.get(".chkAgree").check().should("be.checked");
    cy.get("button").contains("Proceed").click();

    // Step 3: Verify that the user is on the 'Order Confirmation' page.
    cy.get(".products")
      .contains("Thank you, your order has been placed successfully")
      .should("be.visible");

    cy.wait(2000);

    // Step 4: Wait for the redirect to occur after order confirmation.
    // The home page URL is 'https://rahulshettyacademy.com/seleniumPractise/#/'
    cy.url()
      .should("include", "/seleniumPractise/#/")
      .and("not.include", "/country");
  });
});

// Test Case ID: TC03
// Test Case Title: Attempt to Proceed Without Agreeing to Terms & Conditions	

describe("Complete Order for the products in the cart", () => {


  it("Attempt to Proceed Without Agreeing to Terms & Conditions", () => {
    const homePage = new HomePage();
    // Prerequisite: Go to the checkout page.
    homePage.Checkout();
    cy.get("button").contains("Place Order").click();

    cy.get("select").select("India").should("have.value", "India");

    // Step 1: Click 'Proceed' without checking the 'Agree to the Terms & Conditions' checkbox.
    cy.get("button").contains("Proceed").click();

    cy.get(".errorAlert").contains(
      "Please accept Terms & Conditions - Required"
    );
  });
});


// Test Case ID: TC04
// Test Case Title: Check if the PROCEED TO CHECKOUT can be clicked without items

<<<<<<< HEAD
// Test Case ID: TC04
describe("Complete Order for the products in the cart", () => {
=======
describe("Check if the PROCEED TO CHECKOUT can be clicked without items", () => {
>>>>>>> f3427b62f9dcbb5d969fd50cf4ed37256cd561c5


  it("check if the PROCEED TO CHECKOUT can be clicked without items", () => {
    cy.wait(2000);

    // Step 1: Click on the cart icon to view the cart summary.
    cy.get(".cart-icon").click();

    // Step 2: Ensure the option to proceed to checkout is available.
    cy.get(".action-block").contains("PROCEED TO CHECKOUT").should("be.disabled");
    cy.get(".action-block").contains("PROCEED TO CHECKOUT").click();
    
  });
});

// Test Case ID: TC05
// Test Case Title: Navigate Away from Cart and Return

describe("Complete Order for the products in the cart", () => {


  it("Navigate Away from Cart and Return", () => {
    // Prerequisite: Go to the checkout page.
    const homePage = new HomePage();
    homePage.Checkout();
    cy.go('back')
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "1"); // Items should be 1
    });
  });
});

// Test Case ID: TC06
// Test Case Title: Attempt to Proceed Without Selecting Country

describe("Complete Order for the products in the cart", () => {


  it("Attempt to Proceed Without Selecting Country", () => {
    const homePage = new HomePage();
    // Prerequisite: Go to the checkout page.
    homePage.Checkout();
    cy.get("button").contains("Place Order").click();

    cy.get(".chkAgree").check().should("be.checked");

    // Step 1: Click the 'Proceed' button without selecting an option from the 'Choose Country' dropdown.
    cy.get("button").contains("Proceed").click();
    cy.contains("Please select a country").should("be.visible");
    //cy.get(".errorAlert").contains("Please select a country").should("be.visible");
    cy.wait(4000);
    cy.url()
      .should("include", "/seleniumPractise/#/country");

  });
});