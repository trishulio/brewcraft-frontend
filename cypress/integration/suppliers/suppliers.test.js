const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("Suppliers", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal supplier CRUD workflow", function () {
        const name = "supplier-" + id;
        cy.visit("/suppliers");
        cy.intercept("/api/v1/suppliers?*").as("suppliers");
        cy.intercept(/\/api\/v1\/suppliers\/\d+$/).as("fetchSupplier");
        cy.intercept("POST", "/api/v1/suppliers").as("supplierCreate");
        cy.intercept("PATCH", /\/api\/v1\/suppliers\/\d+$/).as("supplierEdit");
        cy.intercept("DELETE", /\/api\/v1\/suppliers\/\d+$/).as(
            "supplierDelete"
        );
        /* create a new Supplier */
        cy.get("[data-testid=newSupplier]").should("exist").click();
        cy.get("[data-testid=supplier-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=supplier-address-line-1]").should("exist");
        cy.get("[data-testid=supplier-address-line-2]").should("exist");
        cy.get("[data-testid=supplier-address-city]").should("exist");
        cy.get("[data-testid=supplier-address-province]").should("exist");
        cy.get("[data-testid=supplier-postal-code]").should("exist");
        cy.get("[data-testid=supplier-address-country]").should("exist");
        cy.get("[data-testid=supplier-save]").should("exist").click();
        cy.wait("@supplierCreate").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body.name).to.equal(name);
        });

        /* Edit same Supplier */

        cy.visit("/suppliers");
        cy.get("table").contains("td", name).click();
        cy.wait("@fetchSupplier").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.get("[data-testid=supplier-edit]").click();
        cy.get("[data-testid=supplier-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=supplier-address-line-1]").should("exist");
        cy.get("[data-testid=supplier-address-line-2]").should("exist");
        cy.get("[data-testid=supplier-address-city]").should("exist");
        cy.get("[data-testid=supplier-address-province]").should("exist");
        cy.get("[data-testid=supplier-postal-code]").should("exist");
        cy.get("[data-testid=supplier-address-country]").should("exist");
        cy.get("[data-testid=supplier-name]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=supplier-save]").should("exist").click();
        cy.wait("@supplierEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        /* select same Supplier */

        cy.visit("/suppliers");
        cy.get("table")
            .contains("td", name + " edit")
            .should("exist");
        cy.get("table")
            .contains("td", name + " edit")
            .click();

        /* Delete same Supplier */

        cy.visit("/suppliers");
        cy.get("table")
            .contains("td", name + " edit")
            .click();
        cy.get("[data-testid=supplier-edit]").click();
        cy.get("[data-testid=supplier-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@supplierDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.visit("/suppliers");
        cy.get("table")
            .contains("td", name + " edit")
            .should("not.exist");
    });
});
