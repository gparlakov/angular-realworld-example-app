import { skip, take } from 'rxjs/operators';

context('Settings page', () => {
  /**  @type User */
  let user;
  beforeEach(() => {
    cy
      // we need to be in our app's domain to fill in tokens in the local storage
      .visit('/register')
      .register()
      .then(u => {
        user = u;
        cy.login(u);
      });
  });

  it('should be visible for logged in users', () => {
    cy.log(`${user.token} ${user.email} ${user.password}`);
    cy.visit('/settings');
    cy.get('h1').should('have.text', 'Your Settings');
  });

  it('should have the user name and email pre-filled', () => {
    cy.visit('/settings');
    cy.get('[data-test=username]').should('have.value', user.username);

    cy.get('[data-test=email]').should('have.value', user.email);
  });

  it.only('should log out successfully', () => {
    cy.visit('/settings');
    cy.get('[data-test="logout"]').click();

    cy.window()
      .its('localStorage')
      .should(l => expect(l.getItem('jwtToken')).to.be.null);
  });
});
