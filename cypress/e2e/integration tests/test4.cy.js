describe("Verify Top Deals Display", () => {
    before(() => {
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    });
  
    it("ensures that the top deals are correctly displayed on the page", () => {
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  
      cy.get(".products").find(".table-bordered").as("dealsTable");
      
      cy.get("@dealsTable").should("be.visible");
  
      cy.get("@dealsTable").find("tbody tr").should("have.length.at.least", 1);
  
      cy.get("@dealsTable").find("thead tr").first().within(() => {
        cy.get("th").eq(0).should("contain", "Veg/fruit name");
        cy.get("th").eq(1).should("contain", "Price");
        cy.get("th").eq(2).should("contain", "Discount price");
      });
  
      cy.get("@dealsTable").find("tbody tr").each(($row) => {
        cy.wrap($row).find("td").should("have.length", 3);
      });
    });
  });
  

  describe("Verify Top Deals Sorting", () => {
    before(() => {
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    });

    it("ensures that the top deals list can be sorted correctly by price", () => {
      cy.contains("th", "Price").should("be.visible").click();

      cy.get("tbody tr").first().find("td").eq(1).invoke('text').then((text1) => {
        const firstPrice = parseFloat(text1);

        cy.contains("th", "Price").should("be.visible").click();

        cy.get("tbody tr").first().find("td").eq(1).invoke('text').should((text2) => {
          const secondPrice = parseFloat(text2);
          expect(firstPrice).to.be.lessThan(secondPrice);
        });
      });
    });
  });

describe("Verify Pagination of Top Deals", () => {
  before(() => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  });

  it("ensures that pagination is functioning correctly", () => {
    cy.get('.pagination').contains('Next').click();

    cy.get('.pagination .active a').invoke('text').then((text) => {
      const currentPageNumber = parseInt(text, 10);

      expect(currentPageNumber).to.be.greaterThan(1);

      cy.get('tbody tr').first().find('td').first().invoke('text').should((newFirstDeal) => {
        expect(newFirstDeal).to.not.equal('Pineapple');
      });
    });
  });
});
