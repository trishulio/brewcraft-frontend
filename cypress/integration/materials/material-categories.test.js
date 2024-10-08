const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

describe("Categories", () => {
    before(() => {
        cy.signIn();
    });

    it("Create an Categories", function () {
        const name = "material-category-" + id;
        cy.intercept("/api/v1/materials/categories?**").as("categories");
        cy.intercept("POST", "/api/v1/materials/categories").as(
            "categoriesCreated"
        );

        /* Create an Categories */

        cy.visit("/materials/categories");
        cy.get("[data-testid=newCategory]").should("exist").click();

        cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=materialCategoryName]")
            .should("exist")
            .type(name)
            .should("have.value", name);
        cy.get("[data-testid=materialCategoryParentCategory]")
            .should("exist")
            .select(1);
        cy.get("[data-testid=categorySave]").should("exist").click();
        cy.wait("@categoriesCreated").then(({ response }) => {
            expect(response.statusCode).to.eq(201);
        });

        cy.intercept("DELETE", "/api/v1/materials/categories/**").as(
            "categoriesDelete"
        );
        cy.intercept("/api/v1/materials/categories?**").as("categories");
        cy.intercept("PATCH", "/api/v1/materials/categories/**").as(
            "categoriesEdit"
        );
        cy.visit("/materials/categories");
        cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.content).to.have.length.of.at.least(1);
        });

        /* Edit same Categories */

        cy.get("[data-testid=paginationLink]").each(function (e) {
            if (!e.hasClass("active")) {
                e.click();
                cy.wait("@categories").then(({ response }) => {
                    expect(response.statusCode).to.eq(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body.content).to.have.length.of.at.least(1);
                });
                cy.contains("td", name).click();
                return false;
            }
        });

        cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.contains(name);
        cy.get("[data-testid=categoryEdit]").click();
        cy.wait("@categories").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body.content).to.have.length.of.at.least(1);
        });
        cy.get("[data-testid=materialCategoryName]")
            .click()
            .focused()
            .clear()
            .type(name + " edit");
        cy.get("[data-testid=categorySave]").should("exist").click();
        cy.wait("@categoriesEdit").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });

        /* Delete same Categories */

        cy.visit("/materials/categories");
        cy.get("[data-testid=paginationLink]").each(function (e) {
            if (!e.hasClass("active")) {
                e.click();
                cy.wait("@categories").then(({ response }) => {
                    expect(response.statusCode).to.eq(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body.content).to.have.length.of.at.least(1);
                });
                cy.contains("td", name + " edit").click();
                return false;
            }
        });
        cy.contains(name + " edit");
        cy.get("[data-testid=categoryEdit]").click();
        cy.get("[data-testid=categoryDelete]").click();
        cy.get("[data-testid=confirm]").click();
        cy.wait("@categoriesDelete").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
    });
});
