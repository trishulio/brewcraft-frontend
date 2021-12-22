const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("Ingredient integration test", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal CRUD workflow", () => {
        const name = "ingredient-" + id;
        cy.visit("/materials/ingredients");
        cy.intercept("/api/v1/materials/categories?*").as("categories");
        cy.intercept(/\/api\/v1\/materials\/\d+$/).as("fetchIngredient");
        cy.intercept("POST", "/api/v1/materials").as("materialCreated");
        cy.intercept("PATCH", /\/api\/v1\/materials\/\d+$/).as("materialEdit");
        cy.intercept("DELETE", /\/api\/v1\/materials\/\d+$/).as(
            "ingredientDelete"
        );

        /* Create an Ingredient */

        cy.get("[data-testid=newIngredient]").should("exist").click();
        cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=ingredient-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=ingredient-category]").should("exist").select("5");
        cy.get("[data-testid=ingredient-measure]").should("exist").select("kg");
        cy.get("[data-testid=ingredient-upc]").should("exist").type("T123");
        cy.get("[data-testid=ingredient-description]")
            .should("exist")
            .type("description is coming from test!");
        cy.get("[data-testid=ingredient-save]").should("exist").click();
        cy.wait("@materialCreated").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body.name).to.equal(name);
        });

        /* Edit same Ingredient */

        cy.visit("/materials/ingredients");
        cy.get("table").contains("td", name).click();
        cy.wait("@fetchIngredient").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.get("[data-testid=ingredient-name]").should("have.value", name);
        cy.get("[data-testid=ingredient-category]").should("have.value", "5");
        cy.get("[data-testid=ingredient-measure]").should("have.value", "kg");
        cy.get("[data-testid=ingredient-upc]").should("have.value", "T123");
        cy.get("[data-testid=ingredient-description]").should(
            "have.value",
            "description is coming from test!"
        );
        cy.get("[data-testid=ingredient-edit]").click();
        cy.get("[data-testid=ingredient-name]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=ingredient-save]").should("exist").click();
        cy.wait("@materialEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });

        /* Delete same Ingredient */

        cy.visit("/materials/ingredients");
        cy.get("table")
            .contains("td", name + " edit")
            .click();
        cy.get("[data-testid=ingredient-edit]").click();
        cy.get("[data-testid=ingredient-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@ingredientDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.visit("/materials/ingredients");
        cy.get("table")
            .contains("td", name + " edit")
            .should("not.exist");
    });
});
