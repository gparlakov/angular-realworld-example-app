// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  const randUser =
    'e2e' +
    Math.random()
      .toString(36)
      .slice(2);
  const user = { email: randUser + '@my.co', password: 'e2gpassword', username: randUser };

  return cy
    .request('POST', `${Cypress.env("API_URL")}/users`, {
      user
    })
    .its('body')
    .then(v => {
      window.localStorage.setItem('jwtToken', v.user.token);
    })
    .then(() => user);
});
