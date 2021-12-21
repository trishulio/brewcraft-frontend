/// <reference types="cypress" />
describe("ingredients", () => {
  before(() => {
    cy.signIn();
    const dateTIme = (Math.random() + 1).toString(36).substring(7);
    cy.wrap(dateTIme).as("getUnieId")
  });


  after(() => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Create an Ingredient", function() {

    cy.fixture("ingredient").then(function(ingredientsJson)  {
      cy.intercept("/api/v1/materials/categories?**").as("categories");
      cy.intercept("POST", "/api/v1/materials").as("materialCreated");
      cy.visit("/materials/ingredients");
      cy.get("[data-testid=newIngredient]").should("exist").click();
      cy.wait("@categories").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.not.be.null;
        expect(response.body.content).to.have.length.of.at.least(1);
      });
      cy.get("[data-testid=ingredient-name]")
        .should("exist")
        .type(
          "{selectall}{backspace}{selectall}{backspace}"+ingredientsJson.IngredientsName+this['getUnieId']
        )
        .should("have.value", ingredientsJson.IngredientsName+this['getUnieId']);
      cy.get("[data-testid=ingredient-category]").should("exist").select("5");
      cy.get("[data-testid=ingredient-measure]").should("exist").select("kg");
      cy.get("[data-testid=ingredient-upc]").should("exist").type("T123");
      cy.get("[data-testid=ingredient-description]")
        .should("exist")
        .type("description is coming from test!");
      cy.get("[data-testid=ingredient-save]").should("exist").click();
      cy.wait("@materialCreated").then(({ response }) => {
        expect(response.statusCode).to.eq(201);
      });
    });
  });

  it("Edit/delete an Ingredient", function() {
    cy.fixture("ingredient").then(function(ingredientsJson) {

      cy.intercept("/api/v1/materials/**").as("ingredientLoad");
      cy.intercept("DELETE", "/api/v1/materials/**").as("ingredientDelete");
      cy.intercept("/api/v1/materials/categories?**").as("categories");
      cy.intercept("PATCH", "/api/v1/materials/**").as("materialEdit");

      cy.visit("/materials/ingredients");
      // cy.contains(ingredientsJson.IngredientsName).click();
      cy.wait("@ingredientLoad").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
      });
      cy.get("[data-testid=paginationLink]").each(function(e) {
        if (!e.hasClass("active")) {
          e.click();
          cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.content).to.have.length.of.at.least(1);
          });
          cy.contains("td", ingredientsJson.IngredientsName+this['getUnieId']).click();
          return false;
        }
      });

      cy.wait("@ingredientLoad").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
      });
      cy.get("[data-testid=ingredient-edit]").click();
      cy.get("[data-testid=ingredient-name]").type("Hi!").clear();
      cy.focused().clear();
      cy.wait(500).focused().type(ingredientsJson.IngredientsNameEdit+this['getUnieId']);
      cy.get("[data-testid=ingredient-save]").should("exist").click();
      cy.wait("@materialEdit").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
      });

      cy.visit("/materials/ingredients");
      cy.get("[data-testid=paginationLink]").each(function(e)  {
        if (!e.hasClass("active")) {
          e.click();
          cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.content).to.have.length.of.at.least(1);
          });
          cy.contains("td", ingredientsJson.IngredientsNameEdit+this['getUnieId']).click();
          return false;
        }
      });

      cy.get("[data-testid=ingredient-edit]").click();
      cy.get("[data-testid=ingredient-delete]").click();
      cy.get("[data-testid=confirm]").click();
      cy.wait("@ingredientDelete").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
      });
    });
  });
});
