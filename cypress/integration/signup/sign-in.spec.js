
context('Sign In',() => {
  it('should sign in successfully', () => {
    cy.visit('/login')
    cy.server()

    cy.route('POST', 'api/users/login').as('login')
    cy.register().then((u) => {

      cy.get('[data-test=email-input]').type(u.email)
      cy.get('[data-test=password-input]').type(u.password)
      cy.get('form.ng-valid .btn', { timeout: 8000 }).click();

    })
    cy.wait('@login').its('status').should('be', '200');
  })
})
