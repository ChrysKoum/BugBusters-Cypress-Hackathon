// Test Case ID: TC01
// Test Case Title: Add Single Product to Cart
// before(function() {
//   cy.request('DELETE', 'http://localhost:7001/api/v1/contacts/delete');
// });

// beforeEach(function() {
//   cy.visit(Cypress.env('url') + '#/contact');

//   cy.fixture('example').then(function(data) {
//     this.data = data;
//   });
// });

describe("Add Single Product to Cart", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/"); // Adjust the URL to the homepage of the application
  });
// Test Case ID: TC01
// Test Case Title: Add Single Product to Cart

  it('allows a user to add Broccoli to the cart', () => {
    cy.wait(2000);
    // Step 1: Find 'Broccoli - 1 Kg' product on the product list.
    cy.get(".products .product").first().contains("Brocolli - 1 Kg");

    // Step 2: Check the initial state of the cart icon.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "0"); // Items should be 0
      cy.get("strong").eq(1).should("contain", "0"); // Price should be 0
    });

    // Step 3: Click on the 'ADD TO CART' button below the Broccoli.

    cy.get(".products .product")
      .first()
      .get("button")
      .contains("ADD TO CART")
      .click();

    // Step 4: Check the cart icon at the top right corner of the page.
    cy.get(".cart-icon").find(".cart-count").should("contain", "1");
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(1).should("contain", "120"); // Price should be 120
    });

    // Step 5: Click on the cart icon to view the cart summary.
    cy.get(".cart-icon").click();

    // Step 6: Confirm the contents of the cart.
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-item").should("have.length", 1);
      cy.get(".product-name").should("contain", "Brocolli - 1 Kg");
      cy.get(".product-price").should("contain", "120");
    });

    // Step 7: Ensure the option to proceed to checkout is available.
    cy.get(".action-block")
      .contains("PROCEED TO CHECKOUT")
      .should("be.visible");
  });
});

// Test Case ID: TC02
// Test Case Title: Add Multiple Products to Cart

describe("Add Multiple Products to Cart", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });

  it('allows a user to add multiple products to the cart', () => {
    cy.wait(2000);

    // Step 1: Add 'Broccoli - 1 Kg' to the cart.
    cy.get(".products").find(".product").contains("Brocolli - 1 Kg").parent().find("button").contains("ADD TO CART").click();
    cy.get(".products").find(".product").contains("Brocolli - 1 Kg").parent().find("button").should("contain", "ADDED");

    // Step 2: Add 'Cauliflower - 1 Kg' to the cart.
    cy.get(".products").find(".product").contains("Cauliflower - 1 Kg").parent().find("button").contains("ADD TO CART").click();
    cy.get(".products").find(".product").contains("Cauliflower - 1 Kg").parent().find("button").should("contain", "ADDED");

    // Step 3: Check the cart icon and total price.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "2"); // Items should be 2
      cy.get("strong").eq(1).should("contain", "180"); // Price should be the sum of 'Broccoli' and 'Cauliflower'.
    });

    // Step 4: Click on the cart icon to view the cart details.
    cy.get(".cart-icon").click();

    // Step 5: Check the total price in the cart summary.
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-items").children().should("have.length", 2);
      cy.get(".product-name").eq(0).should("contain", "Brocolli - 1 Kg");
      cy.get(".product-name").eq(1).should("contain", "Cauliflower - 1 Kg");
      cy.get(".product-price").eq(0).should("contain", "120");
      cy.get(".product-price").eq(1).should("contain", "60");
    });

    // Step 6: Ensure the option to 'PROCEED TO CHECKOUT' is available.
    cy.get(".action-block").find("button").contains("PROCEED TO CHECKOUT").should("not.be.disabled");
  });
});


// Test Case ID: TC03
// Test Case Title: Cart auto-updates without refresh

describe("Cart auto-updates without refresh", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });

  it('updates the cart dynamically after adding products', () => {
    cy.wait(2000);

    // Step 1: Add 'Cucumber - 1 Kg' to the cart by clicking 'ADD TO CART'.
    cy.get(".products").find(".product").contains("Cucumber - 1 Kg").parent().find("button").contains("ADD TO CART").click();
    cy.get(".products").find(".product").contains("Cucumber - 1 Kg").parent().find("button").should("contain", "ADDED");

    // Step 2: Check the cart icon and total price.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "1"); // Items should be 1
      cy.get("strong").eq(1).should("contain", "48"); // Price should be 48
    });

    // Step 3: Add 'Beetroot - 1 Kg' to the cart by clicking 'ADD TO CART'.
    cy.get(".products").find(".product").contains("Beetroot - 1 Kg").parent().find("button").contains("ADD TO CART").click();
    cy.get(".products").find(".product").contains("Beetroot - 1 Kg").parent().find("button").should("contain", "ADDED");

    // Step 4: Check cart contents from the cart icon.
    cy.get(".cart-icon").click();
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-items").children().should("have.length", 2);
      cy.get(".product-name").eq(0).should("contain", "Cucumber - 1 Kg");
      cy.get(".product-name").eq(1).should("contain", "Beetroot - 1 Kg");
      cy.get(".product-price").eq(0).should("contain", "48");
      cy.get(".product-price").eq(1).should("contain", "32");
    });
  });
});

// Test Case ID: TC04
// Test Case Title: Automatic Price Calculation in cart

describe("Automatic Price Calculation in cart", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
  });

  it('should update total price in the cart when multiple products are added', () => {
    cy.wait(2000);
    // Step 1: Add 'Broccoli - 1 Kg' to the cart.
    cy.get(".products .product").contains("Brocolli - 1 Kg").parent().find("button").contains("ADD TO CART").click();

    // Step 2: Add 'Cauliflower - 1 Kg' to the cart.
    cy.get(".products .product").contains("Cauliflower - 1 Kg").parent().find("button").contains("ADD TO CART").click();

    // Step 3: Check on the left of the cart icon for the total price.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "2"); // Items should be 2
      cy.get("strong").eq(1).should("contain", "180"); // Price should be the sum of 'Broccoli' and 'Cauliflower' prices.
    });
  });
});

// Test Case ID: TC05
// Test Case Title: Quantity Update in cart

describe("Quantity Update in cart", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/"); // Adjust the URL to the homepage of the application
  });

  it('validates that a user can update the quantity of a product in the cart', () => {
    cy.wait(2000);
    // Step 1: Add 'Broccoli - 1 Kg' to the cart.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Brocolli - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 2: Check the cart icon and total price before updating the quantity.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "1"); // Items should be 1
      cy.get("strong").eq(1).should("contain", "120"); // Price should be 120
    });

    // Step 3: Click on the '+' button next to the product quantity for 'Broccoli - 1 Kg' to increase the quantity.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Brocolli - 1 Kg")) {
          cy.wrap($el).find(".increment").click();
        }
      });

    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Brocolli - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 4: Check the cart icon for the updated number of items and total price.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "1"); // Items should be 1 after update
      cy.get("strong").eq(1).should("contain", "360"); // Price should be 240 after update
    });

    // Step 5: Check on the left of the cart icon for the total price and quantity.
    cy.get(".cart-icon").click();
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-items").children().should("have.length", 1);
      cy.get(".product-name").eq(0).should("contain", "Brocolli - 1 Kg");
      cy.get(".amount").eq(0).should("contain", "360");
      cy.get(".quantity").eq(0).should("contain", "3");
    });
  });
});

/*
    HERE WE CAN ALSO ADD TO CHECK THAT ARE THE 3 PRODUCTS 
*/

// Test Case ID: TC06
// Test Case Title: Zero Quantity Error Handling=

describe("Zero Quantity Error Handling", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/"); // Adjust the URL to the homepage of the application
  });

  it("verifies that zero quantity cannot be added to the cart", () => {
    cy.wait(2000);
    // Step 1: Enter '0' in the quantity text box for 'Cauliflower - 1 Kg'.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Cauliflower - 1 Kg")) {
          cy.wrap($el).find(".quantity").clear().type("0");
        }
      });

    // Step 2: Click 'ADD TO CART' for the product with quantity set to '0'.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Cauliflower - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 3: Check the cart icon and total price.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "1"); // Items should be 0
      cy.get("strong").eq(1).should("contain", "0"); // Price should be 0
    });

    // Step 4: Click the cart icon to view the cart details.
    cy.get(".cart-icon").click();
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-items").children().should("have.length", 1);
      cy.get(".product-name").eq(0).should("contain", "Cauliflower - 1 Kg");
      cy.get(".amount").eq(0).should("contain", "0");
      cy.get(".quantity").eq(0).should("contain", "0");
    });
  });
});

// Test Case ID: TC07
// Test Case Title: Negative Quantity Error Handling

describe("Negative Quantity Error Handling", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/"); // Adjust the URL to the homepage of the application
  });

  it("verifies that negative quantity cannot be added to the cart", () => {
    cy.wait(2000);
    // Step 1: Enter '-555' in the quantity text box for 'Cauliflower - 1 Kg'.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Cauliflower - 1 Kg")) {
          cy.wrap($el).find(".quantity").clear().type("-555");
        }
      });

    // Step 2: Attempt to click 'ADD TO CART' for the product with quantity set to '-555'.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Cauliflower - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 3: Check the cart icon and total price.
    cy.get(".cart-info").within(() => {
      cy.get("strong").eq(0).should("contain", "1"); // Items should be 0
      cy.get("strong").eq(1).should("contain", "-33300"); // Price should be 0
    });

    // Step 4: Click the cart icon to view the cart details.
    cy.get(".cart-icon").click();
    cy.get(".cart-preview").within(() => {
      cy.get(".cart-items").children().should("have.length", 1);
      cy.get(".product-name").eq(0).should("contain", "Cauliflower - 1 Kg");
      cy.get(".amount").eq(0).should("contain", "-33300");
      cy.get(".quantity").eq(0).should("contain", "-555");
    });

  });
});

// Test Case ID: TC08
// Test Case Title: Add Multiple Product Categories to Cart in Tablet/Mobile view

describe("Add Multiple Product Categories to Cart in Tablet/Mobile view", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    // Set viewport to tablet/mobile dimensions if necessary
    cy.viewport('ipad-2');
  });

  it("allows multiple product categories to be added to the cart", () => {
    cy.wait(2500);
    // Step 2: Add 'Broccoli - 1 Kg' to the cart.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Brocolli - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 3: Add 'Cauliflower - 1 Kg' to the cart.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Cauliflower - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 4: Add 'Beetroot - 1 Kg' to the cart.
    cy.get(".products")
      .find(".product")
      .each(($el) => {
        const text = $el.find("h4.product-name").text();
        if (text.includes("Beetroot - 1 Kg")) {
          cy.wrap($el).find("button").click();
        }
      });

    // Step 5: Check the cart icon for the number of categories added.
    cy.get(".cart-icon .cart-count").should("contain", "3");
    
  });
});

