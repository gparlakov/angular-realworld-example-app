context('SignUp', () => {
  it('when user navigates to register they should see the title', () => {
    cy.visit('/register');
    cy.get('h1').should('contain.text', 'Sign up');
  });

  it('when user navigates to register they should see username, email and password inputs', () => {
    cy.visit('/register');
    cy.get('[data-test=user-input]').should('be.visible');
    cy.get('[data-test=email-input]').should('be.visible');
    cy.get('[data-test=password-input]').should('be.visible');
  });

  it('when user navigates to register, fills in data and clicks submit should create a user successfully', () => {
    cy.visit('/register');

    const randUser =
      'e2e' +
      Math.random()
        .toString(36)
        .slice(2);

    cy.server()
      .route('POST', /api\/users/)
      .as('register');

    cy.get('[data-test=user-input]').type(randUser);
    cy.get('[data-test=email-input]').type(randUser + '@mailinator.com');
    cy.get('[data-test=password-input]').type('mye2euserP@assword');

    cy.get('form.ng-valid > :nth-child(1) > .btn').click();

    const route = cy
      .wait('@register')
      .its('responseBody')
      .should(r => {
        expect(r.user).not.to.be.undefined;
        expect(r.user.id).exist
      });
  });
});
