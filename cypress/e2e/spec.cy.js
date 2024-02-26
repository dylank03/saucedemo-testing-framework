describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('https://www.saucedemo.com/')
  })
  it('logs in successfully with correct username and password', () => {
    cy.get("[data-test='username']").type('standard_user')
    cy.get("[data-test='password']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.location("pathname").should("equal", "/inventory.html")
  })
  it('shows an error message if incorrect username is entered', ()=>{
    cy.get("[data-test='username']").type('invalid_username')
    cy.get("[data-test='password']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Epic sadface").contains('Username')
  })
  it('shows an error message if incorrect password is entered',()=>{
    cy.get("[data-test='username']").type('standard_user')
    cy.get("[data-test='password']").type('invalid_password')
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Epic sadface").contains('password')
  })
  it('shows an error message if incorrect username and password is entered',()=>{
    cy.get("[data-test='username']").type('invalid_username')
    cy.get("[data-test='password']").type('invalid_password')
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Epic sadface").contains('Username').contains('password')
  })
  it('returns error message if no username or password is entered',()=>{
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Username is required")
  })
  it('shows an error message if no username is entered', ()=>{
    cy.get("[data-test='password']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Username is required")
  })
  it('shows an error message if no password is entered',()=>{
    cy.get("[data-test='username']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Password is required")
  })
  it('Password is case-sensitive', ()=>{
    cy.get("[data-test='username']").type('standard_user')
    cy.get("[data-test='password']").type('Secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.get("[data-test='error']").should("exist").contains("Epic sadface").contains('password')
  })
  it('username is case-insensitive',()=>{
    cy.get("[data-test='username']").type('STANDARD_user')
    cy.get("[data-test='password']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.location("pathname").should("equal", "/inventory.html")
  })
  it('username field ignores spaces after username',()=>{
    cy.get("[data-test='username']").type('standard_user   ')
    cy.get("[data-test='password']").type('secret_sauce')
    cy.get("[data-test='login-button']").click()
    cy.location("pathname").should("equal", "/inventory.html")
  })
})