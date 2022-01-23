const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("Suppliers", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal supplier CRUD workflow", function () {
        const name = "supplier-contact-" + id;
        cy.visit("/suppliers/contacts");
        cy.intercept("/api/v1/suppliers/contacts?*").as("supplierContacts");
        cy.intercept("/api/v1/suppliers?*").as("suppliers");
        cy.intercept(/\/api\/v1\/suppliers\/contacts\/\d+$/).as(
            "fetchSupplierContact"
        );
        cy.intercept("POST", /\/api\/v1\/suppliers\/\d+\/contacts$/).as(
            "supplierContactCreate"
        );
        cy.intercept("PATCH", /\/api\/v1\/suppliers\/contacts\/\d+$/).as(
            "supplierContactEdit"
        );
        cy.intercept("DELETE", /\/api\/v1\/suppliers\/contacts\/\d+$/).as(
            "supplierContactDelete"
        );
        /* create a new Supplier */
        cy.get("[data-testid=newSupplierContact]").should("exist").click();
        cy.wait("@suppliers", { timeout: 15000 }).then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.suppliers).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=contact-first-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=contact-last-name]")
            .should("exist")
            .type("contact-last-name");
        cy.get("[data-testid=contact-supplier]").should("exist").select(1);
        cy.get("[data-testid=contact-position]").should("exist");
        cy.get("[data-testid=contact-email]")
            .should("exist")
            .type("contact@email.something");
        cy.get("[data-testid=contact-phone]")
            .should("exist")
            .type("+1234567890");
        cy.get("[data-testid=supplier-contact-save]").should("exist").click();
        cy.wait("@supplierContactCreate").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body.firstName).to.equal(name);
        });

        /* Edit same Supplier */

        cy.visit("/suppliers/contacts");
        cy.get("table").contains("td", name).click();
        cy.wait("@fetchSupplierContact").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.wait("@suppliers", { timeout: 15000 }).then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.suppliers).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=supplier-contact-edit]").click();
        cy.get("[data-testid=contact-first-name]").should("have.value", name);
        cy.get("[data-testid=contact-last-name]")
            .should("exist")
            .should("be.ok")
            .should("not.have.value", "");
        cy.get("[data-testid=contact-supplier]")
            .should("exist")
            .should("be.ok")
            .should("not.have.value", "");
        cy.get("[data-testid=contact-position]").should("exist");
        cy.get("[data-testid=contact-email]")
            .should("exist")
            .should("be.ok")
            .should("not.have.value", "");
        cy.get("[data-testid=contact-phone]")
            .should("exist")
            .should("be.ok")
            .should("not.have.value", "");
        cy.get("[data-testid=contact-first-name]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=supplier-contact-save]").should("exist").click();
        cy.wait("@supplierContactEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        /* select same Supplier */

        cy.visit("/suppliers/contacts");
        cy.get("table")
            .contains("td", name + " edit")
            .should("exist");
        cy.get("table")
            .contains("td", name + " edit")
            .click();

        /* Delete same Supplier */

        cy.visit("/suppliers/contacts");
        cy.get("table")
            .contains("td", name + " edit")
            .click();
        cy.get("[data-testid=supplier-contact-edit]").click();
        cy.get("[data-testid=supplier-contact-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@supplierContactDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.visit("/suppliers/contacts");
        cy.get("table")
            .contains("td", name + " edit")
            .should("not.exist");
    });
});
