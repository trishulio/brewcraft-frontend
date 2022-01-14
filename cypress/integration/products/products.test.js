const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("Products", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal product CRUD workflow", function () {
        const name = "product-" + id;
        cy.visit("/products");
        cy.intercept("/api/v1/products?*").as("products");
        cy.intercept(/\/api\/v1\/products\/\d+$/).as("fetchProduct");
        cy.intercept("POST", "/api/v1/products").as("productCreated");
        cy.intercept("PATCH", /\/api\/v1\/products\/\d+$/).as("productdit");
        cy.intercept("DELETE", /\/api\/v1\/products\/\d+$/).as("productDelete");

        /* create a new Product */
        cy.get("[data-testid=newProduct]").should("exist").click();
        cy.wait("@products").then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=product-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=product-class]").should("exist").select("Beer");
        cy.get("[data-testid=product-type]").should("exist").select(1);
        cy.get("[data-testid=product-style]").should("exist").select(1);
        cy.get("[data-testid=product-description]")
            .should("exist")
            .type("description is coming from test!");
        cy.get("[data-testid=product-save]").should("exist").click();
        cy.wait("@productCreated").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body.name).to.equal(name);
        });

        /* Edit same Product */

        cy.visit("/products");
        cy.get("table").contains("td", name).click();
        cy.wait("@fetchProduct").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.get("[data-testid=product-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=product-class]").should("exist").select("Beer");
        cy.get("[data-testid=product-type]").should("exist").select(1);
        cy.get("[data-testid=product-style]").should("exist").select(1);
        cy.get("[data-testid=product-description]")
            .should("exist")
            .type("description is coming from test!");
        cy.get("[data-testid=product-edit]").click();
        cy.get("[data-testid=product-name]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=product-save]").should("exist").click();
        cy.wait("@productEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        /* select same Product */

        cy.visit("/products");
        cy.get("table")
            .contains("td", name + " edit")
            .should("exist");
        cy.get("table")
            .contains("td", name + " edit")
            .click();

        /* Delete same Product */

        cy.visit("/products");
        cy.get("table")
            .contains("td", name + " edit")
            .click();
        cy.get("[data-testid=product-edit]").click();
        cy.get("[data-testid=product-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@productDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.visit("/products");
        cy.get("table")
            .contains("td", name + " edit")
            .should("not.exist");
    });
});
