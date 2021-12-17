describe("Material Page",()=>{

    before(()=>{
      cy.signIn()
    })

it("Material api test",()=>{
    cy.visit('/materials/ingredients');
    cy.get(".logo-lg").should("be.visible");
})

})