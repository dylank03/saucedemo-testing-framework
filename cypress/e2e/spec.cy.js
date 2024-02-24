describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('https://www.saucedemo.com')
  })
  it('logs in successfully with correct username and password', () => {
    cy.get("[data-test='username']").type('standard_user')
    cy.get("[data-test='password']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.location("pathname").should("equal", "/inventory.html")
  })
})