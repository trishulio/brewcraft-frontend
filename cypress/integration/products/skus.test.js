const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("skus", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal sku CRUD workflow", function () {
        const name = "sku-" + id;
        cy.visit("/sku");
        cy.intercept("/api/v1/skus?*").as("skus");
        cy.intercept(/\/api\/v1\/skus\/\d+$/).as("fetchSku");
        cy.intercept("POST", "/api/v1/skus").as("skuCreated");
        cy.intercept("PATCH", /\/api\/v1\/skus\/\d+$/).as("skuEdit");
        cy.intercept("DELETE", /\/api\/v1\/skus\/\d+$/).as("skuDelete");

        /* create a new SKU */
        cy.get("[data-testid=newSku]").should("exist").click();
        cy.wait("@skus").then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=sku-name]").type(name).should("have.value", name);
        cy.get("[data-testid=sku-product]").should("exist").select(1);
        cy.get("[data-testid=sku-quantity]").should("exist").type(10);
        cy.get("[data-testid=sku-base-quantity-unit]")
            .should("exist")
            .select("kg");
        cy.get("[data-testid=sku-description]")
            .should("exist")
            .type("description is coming from test!");
        cy.get("[data-testid=sku-save]").should("exist").click();
        cy.wait("@skuCreated").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body.name).to.equal(name);
        });

        /* Edit same SKU */

        cy.visit("/sku");
        cy.get("table").contains("td", name).click();
        cy.wait("@fetchSku").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.get("[data-testid=sku-name]").type(name).should("have.value", name);
        cy.get("[data-testid=sku-product]").should("exist").select(1);
        cy.get("[data-testid=sku-quantity]").should("exist").type(10);
        cy.get("[data-testid=sku-base-quantity-unit]")
            .should("exist")
            .select("kg");
        cy.get("[data-testid=sku-description]")
            .should("exist")
            .type("description is coming from test!");
        cy.get("[data-testid=sku-edit]").click();
        cy.get("[data-testid=sku-name]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=sku-save]").should("exist").click();
        cy.wait("@skuEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        /* select same SKU */

        cy.visit("/sku");
        cy.get("table")
            .contains("td", name + " edit")
            .should("exist");
        cy.get("table")
            .contains("td", name + " edit")
            .click();

        /* Delete same SKU */

        cy.visit("/sku");
        cy.get("table")
            .contains("td", name + " edit")
            .click();
        cy.get("[data-testid=sku-edit]").click();
        cy.get("[data-testid=sku-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@skuDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.visit("/sku");
        cy.get("table")
            .contains("td", name + " edit")
            .should("not.exist");
    });
});
