/// <reference types="cypress" />
describe("Packaging", () => {
    before(() => {
        cy.signIn();
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

    it("Create an Packaging", () => {
        cy.fixture("ingredient").then((ingredientsJson) => {
            cy.intercept("/api/v1/materials/categories?**").as("categories");
            cy.intercept("POST", "/api/v1/materials").as("materialCreated");
            cy.visit("/materials/packaging");
            cy.get("[data-testid=newPackaging]").should("exist").click();

            cy.wait("@categories").then(({ response }) => {
                expect(response.statusCode).to.eq(200);
                expect(response.body).to.not.be.null;
                expect(response.body.content).to.have.length.of.at.least(1);
            });
            cy.get("[data-testid=packagingNname]")
                .should("exist")
                .type(
                    "{selectall}{backspace}{selectall}{backspace}" +
                        ingredientsJson.IngredientsName
                )
                .should("have.value", ingredientsJson.IngredientsName);
            cy.get("[data-testid=packagingCategory]").should("exist").select(2);
            cy.get("[data-testid=packagingMeasure]").should("exist").select(2);
            cy.get("[data-testid=packagingUpc]").should("exist").type("T123");
            cy.get("[data-testid=packagingDescription]")
                .should("exist")
                .type("description is coming from test!");
            cy.get("[data-testid=packagingSave]").should("exist").click();
            cy.wait("@materialCreated").then(({ response }) => {
                expect(response.statusCode).to.eq(201);
            });
        });
    });

    it("Edit/delete an Packaging", () => {
        cy.fixture("ingredient").then((ingredientsJson) => {
            cy.intercept("/api/v1/materials/**").as("loadData");
            cy.intercept("DELETE", "/api/v1/materials/**").as(
                "packagingDelete"
            );
            cy.intercept("/api/v1/materials/categories?**").as("categories");
            cy.intercept("PATCH", "/api/v1/materials/**").as("materialEdit");

            cy.visit("/materials/packaging");
            cy.wait("@loadData").then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });
            cy.get("[data-testid=paginationLink]").each((e) => {
                if (!e.hasClass("active")) {
                    e.click();
                    cy.wait("@categories").then(({ response }) => {
                        expect(response.statusCode).to.eq(200);
                        expect(response.body).to.not.be.null;
                        expect(
                            response.body.content
                        ).to.have.length.of.at.least(1);
                    });
                    cy.contains("td", ingredientsJson.IngredientsName).click();
                    return false;
                }
            });

            cy.wait("@loadData").then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });
            cy.get("[data-testid=packagingEdit]").click();
            cy.get("[data-testid=packagingNname]").type("Hi!").clear();
            cy.focused().clear();
            cy.wait(500).focused().type(ingredientsJson.IngredientsNameEdit);
            cy.get("[data-testid=packagingSave]").should("exist").click();
            cy.wait("@materialEdit").then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });

            cy.visit("/materials/packaging");
            cy.get("[data-testid=paginationLink]").each((e) => {
                if (!e.hasClass("active")) {
                    e.click();
                    cy.wait("@categories").then(({ response }) => {
                        expect(response.statusCode).to.eq(200);
                        expect(response.body).to.not.be.null;
                        expect(
                            response.body.content
                        ).to.have.length.of.at.least(1);
                    });
                    cy.contains(
                        "td",
                        ingredientsJson.IngredientsNameEdit
                    ).click();
                    return false;
                }
            });

            cy.get("[data-testid=packagingEdit]").click();
            cy.get("[data-testid=packagingDelete]").click();
            cy.get("[data-testid=confirm]").click();
            cy.wait("@packagingDelete").then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });
        });
    });
});
