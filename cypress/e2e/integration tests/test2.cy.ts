import HomePage from "../pageObject/HomePage";

// Test Case ID: TC01
// Test Case Title: Review Shopping Cart and Proceed to Checkout

describe("Review Shopping Cart and Proceed to Checkout", () => {
    before(() => {
        const homePage = new HomePage();
        homePage.visitHomePage(); // Corrected function call
        // Make sure to adjust this URL to your application's homepage
    });

  it("allows a user to review the cart and proceed to checkout", () => {

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
        
  });
});

// Test Case ID: TC02
// Test Case Title: Select Country and Agree to Terms and Conditions

describe("Select Country and Agree to Terms and Conditions", () => {
  before(() => {
    const homePage = new HomePage();
    homePage.visitHomePage(); 
  });

  it("ensures that a user can select their country and agree to the terms and conditions", () => {
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

describe("Attempt to Proceed Without Agreeing to Terms & Conditions", () => {
  before(() => {
    const homePage = new HomePage();
    homePage.visitHomePage(); 
  });

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

// Test Case ID: TC04
describe("Check if the PROCEED TO CHECKOUT can be clicked without items", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/"); // Adjust the URL to the homepage of the application
  });

  it("check if the PROCEED TO CHECKOUT can be clicked without items", () => {
    cy.wait(2000);

    // Step 1: Click on the cart icon to view the cart summary.
    cy.get(".cart-icon").click();

    // Step 2: Ensure the option to proceed to checkout is available.
    cy.get(".action-block").contains("PROCEED TO CHECKOUT").click();
  });
});



// Test Case ID: TC07
// Test Case Title: Attempt to Proceed Without Selecting Country

describe("Attempt to Proceed Without Selecting Country", () => {
  before(() => {
    const homePage = new HomePage();
    homePage.visitHomePage();
  });

  it.only("Attempt to Proceed Without Selecting Country", () => {
    const homePage = new HomePage();
    // Prerequisite: Go to the checkout page.
    homePage.Checkout();
    cy.get("button").contains("Place Order").click();

    cy.get(".chkAgree").check().should("be.checked");

    // Step 1: Click the 'Proceed' button without selecting an option from the 'Choose Country' dropdown.
    cy.get("button").contains("Proceed").click();
  });
});