const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("product categories", () => {
    before(() => {
        cy.signIn();
    });

    it("validates normal product categories CRUD workflow", function () {
        const name = "product-category-" + id;
        cy.visit("/products/categories");
        cy.intercept("/api/v1/products/categories?*").as("productCategories");
        cy.intercept(/\/api\/v1\/products\/categories\/\d+$/).as(
            "fetchProductCategory"
        );
        cy.intercept("POST", "/api/v1/products/categories").as(
            "productCategoryCreated"
        );
        cy.intercept("PATCH", /\/api\/v1\/products\/categories\/\d+$/).as(
            "productCategoryEdit"
        );
        cy.intercept("DELETE", /\/api\/v1\/products\/categories\/\d+$/).as(
            "productCategoryDelete"
        );

        /* create a new Product category */
        cy.get("[data-testid=newProductCategory]").should("exist").click();
        cy.wait("@productCategories").then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.content).to.have.length.of.at.least(1);
        });

        cy.get("[data-testid=product-category-name]")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=product-category-class]").should("exist");
        cy.get("[data-testid=product-category-type]").should("exist");
        cy.get("[data-testid=product-category-save]").should("exist").click();
        cy.wait("@productCategoryCreated").then(({ response }) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body.name).to.equal(name);
        });

        /* Edit same Product category */

        cy.visit("/products/categories");
        cy.get("table").contains("td", name).click();
        cy.wait("@fetchProductCategory").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.get("[data-testid=product-category-edit]").click();
        cy.get("[data-testid=product-category-name]").should(
            "have.value",
            name
        );
        cy.get("[data-testid=product-category-class]").should("exist");
        cy.get("[data-testid=product-category-type]").should("exist");
        cy.get("[data-testid=product-category-name]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=product-category-save]").should("exist").click();
        cy.wait("@productCategoryEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        /* select same Product category */

        cy.visit("/products/categories");
        cy.get("table")
            .contains("td", name + " edit")
            .should("exist");
        cy.get("table")
            .contains("td", name + " edit")
            .click();

        /* Delete same Product category */

        cy.visit("/products/categories");
        cy.get("table")
            .contains("td", name + " edit")
            .click();
        cy.get("[data-testid=product-category-edit]").click();
        cy.get("[data-testid=product-category-delete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@productCategoryDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.visit("/products/categories");
        cy.get("table")
            .contains("td", name + " edit")
            .should("not.exist");
    });
});
