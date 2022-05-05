const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

describe("PurchaseInvoices", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal purchase-invoice CRUD workflow", function () {
        const name = "invoice-" + id;
        var day = new Date();
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        cy.visit("/purchases/invoices");
        cy.intercept("/api/v1/procurements?*").as("procurements");
        cy.intercept("/api/v1/materials/categories?*").as("categories");
        cy.intercept("/api/v1/suppliers?*").as("suppliers");
        cy.intercept("/api/v1/materials?*").as("materials");
        cy.intercept(/\/api\/v1\/procurements\/\d+\/\d+$/).as(
            "fetchProcurement"
        );
        cy.intercept("POST", "/api/v1/procurements").as("procurementCreate");
        cy.intercept("POST", "/api/v1/purchases/orders").as("orderCreate");
        cy.intercept("PUT", "/api/v1/purchases/orders").as("orderEdit");
        cy.intercept("PUT", "/api/v1/procurements").as("procurementEdit");
        cy.intercept("DELETE", "/api/v1/procurements").as("procurementDelete");

        /* create a new procurement */
        cy.get("[data-testid=newInvoice]").should("exist").click();
        cy.wait("@categories", { timeout: 15000 }).then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.wait("@suppliers", { timeout: 15000 }).then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.suppliers).to.have.length.of.at.least(1);
        });
        cy.wait("@materials", { timeout: 15000 }).then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=invoice-details-PoSo]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=invoice-details-invoide-date]")
            .should("exist")
            .type(formatDate(day));
        cy.get("[data-testid=invoice-details-due-date]")
            .should("exist")
            .type(formatDate(nextDay));
        cy.get("[data-testid=invoice-details-invoice-number]")
            .should("exist")
            .type(id);
        cy.get("[data-testid=invoice-details-supplier]")
            .should("exist")
            .select(1);
        cy.get("[data-testid=invoice-details-status]")
            .should("exist")
            .select(1);
        cy.get("[data-testid=purchase-invoice-item-material]")
            .should("exist")
            .select(1);
        cy.get("[data-testid=purchase-invoice-item-description]")
            .should("exist")
            .type("description is coming from test!");
        cy.get("[data-testid=purchase-invoice-item-lot]")
            .should("exist")
            .type(5);
        cy.get("[data-testid=purchase-invoice-item-quantity]")
            .should("exist")
            .type(5);
        cy.get("[data-testid=purchase-invoice-item-price]")
            .should("exist")
            .type(200);
        cy.get("[data-testid=purchase-invoice-item-pst-tax]")
            .should("exist")
            .type(2);
        cy.get("[data-testid=purchase-invoice-item--gst-tax]")
            .should("exist")
            .type(2);
        cy.get("[data-testid=invoice-save]").should("exist").click();
        cy.wait("@procurementCreate").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
        });
        cy.wait("@orderCreate").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body[0].orderNumber).to.equal(name);
        });

        /* Edit same Invoice */

        cy.visit("/purchases/invoices");
        cy.get("table").contains("td", id).click();
        cy.wait("@fetchProcurement").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.get("[data-testid=invoice-edit]").click();
        cy.get("[data-testid=invoice-details-PoSo]").should("have.value", name);
        cy.get("[data-testid=invoice-details-invoide-date]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=invoice-details-due-date]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=invoice-details-invoice-number]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=invoice-details-supplier]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=invoice-details-status]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-material]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-description]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-lot]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-quantity]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-price]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-pst-tax]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=purchase-invoice-item-gst-tax]")
            .should("exist")
            .should("not.have.value", "");
        cy.get("[data-testid=invoice-details-invoice-number]")
            .click()
            .focused()
            .clear()
            .type(id + " edit");
        cy.get("[data-testid=invoice-save]").should("exist").click();
        cy.wait("@procurementEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(202);
        });
        /* select same Invoice */

        cy.visit("/purchases/invoices");
        cy.get("table")
            .contains("td", id + " edit")
            .should("exist");
        cy.get("table")
            .contains("td", id + " edit")
            .click();

        /* Delete same Invoice */

        cy.visit("/purchases/invoices");
        cy.get("table")
            .contains("td", id + " edit")
            .click();
        cy.get("[data-testid=invoice-edit]").click();
        cy.get("[data-testid=invoice-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@procurementDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(202);
        });
        cy.visit("/purchases/invoices");
        cy.get("table")
            .contains("td", id + " edit")
            .should("not.exist");
    });
});
