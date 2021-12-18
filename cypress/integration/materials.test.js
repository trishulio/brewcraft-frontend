/// <reference types="cypress" />

describe("Material test!!",()=>{
  const randomValue = 'Test_'+Math.random(Date().toString())

  /**
   *
   */

  before(()=>{
    cy.signIn()
  })
  /**
   *
   */
  after(()=>{
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
  })

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Create an Ingredient",()=>{
    cy.fixture('ingredient').then((ingredientsJson)=>{


    cy.intercept('/api/v1/materials/categories?**').as('categories');
    cy.intercept('POST','/api/v1/materials').as('materialCreated')
    cy.visit('/materials/ingredients');
    cy.get('[data-testid=newIngredient]').should('exist').click()
    cy.wait("@categories").then(({response})=>{
        expect(response.statusCode).to.eq(200)
        expect(response.body).to.not.be.null;
        expect(response.body.content).to.have.length.of.at.least(1)
    })
    cy.get('[data-testid=ingredient-name]').should('exist').type('{selectall}{backspace}{selectall}{backspace}'+ingredientsJson.Ingredientsname).should('have.value', ingredientsJson.Ingredientsname)
    cy.get('[data-testid=ingredient-category]').should('exist').select('5')
    cy.get('[data-testid=ingredient-measure]').should('exist').select('kg')
    cy.get('[data-testid=ingredient-upc]').should('exist').type('T123')
    cy.get('[data-testid=ingredient-description]').should('exist').type("description is coming from test!");
    cy.get('[data-testid=ingredient-save]').should('exist').click();
    cy.wait('@materialCreated').then(({response})=>{
      expect(response.statusCode).to.eq(201)
    })
  })
})

  it("Edit/delete an Ingredient",()=>{
    cy.fixture('ingredient').then((ingredientsJson)=>{
    cy.intercept('/api/v1/materials/**').as('ingredientLoad');
    cy.intercept('DELETE','/api/v1/materials/**').as('ingredientDelete');
    cy.intercept('/api/v1/materials/categories?**').as('categories');
    cy.intercept('PATCH','/api/v1/materials/**').as('materialEdit')

    cy.visit('/materials/ingredients')
    cy.contains(ingredientsJson.Ingredientsname).click();
    cy.wait('@ingredientLoad').then(({response})=>{
      expect(response.statusCode).to.eq(200)
    })

    cy.contains(ingredientsJson.Ingredientsname)
    cy.get('[data-testid=ingredient-edit]').click()
    cy.wait("@categories").then(({response})=>{
      expect(response.statusCode).to.eq(200)
      expect(response.body).to.not.be.null;
      expect(response.body.content).to.have.length.of.at.least(1)
    })

    cy.get('[data-testid=ingredient-name]').type('Hi!').clear()
    cy.focused().clear()
    cy.wait(500).focused().type(ingredientsJson.Ingredientsnameedit)
    cy.get('[data-testid=ingredient-save]').should('exist').click();
    cy.wait('@materialEdit').then(({response})=>{
      expect(response.statusCode).to.eq(200)
    })
      // cy.wait('@ingredientLoad').then(({response})=>{
      //   expect(response.statusCode).to.eq(200)
      // })
      cy.contains(ingredientsJson.Ingredientsname+ingredientsJson.Ingredientsnameedit)
      cy.get('[data-testid=ingredient-edit]').click()
      cy.get('[data-testid=ingredient-delete]').click()
      cy.get('[data-testid=confirm]').click()
      cy.wait('@ingredientDelete').then(({response})=>{
        expect(response.statusCode).to.eq(200)
      })

    })
  })
   /**
   *
   */
  // it("Create an Packaging Item",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Edit an Packaging Item",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Select from Packaging Items page Packaging Item",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Delete Packaging Item",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Create a Material Category",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Edit an Material Category",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Select from Material Categories page Material Category",()=>{

  // })
  //  /**
  //  *
  //  */
  // it("Delete Material Category",()=>{

  // })



})