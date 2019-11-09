Cypress.Commands.add('register', () => {
  const randUser =
    'e2e' +
    Math.random()
      .toString(36)
      .slice(2);
  const registerUserReq = {
    email: randUser + '@my.co',
    password: 'e2gpassword',
    username: randUser
  };

  return cy
    .request('POST', `${Cypress.env('API_URL')}/users`, {
      user: registerUserReq
    })
    .its('body')
    .then(v => {
      window.localStorage.setItem('jwtToken', v.user.token);
      v.user.password = registerUserReq.password;
      return v.user;
    });
});

Cypress.Commands.add(
  'login',
  /** @param {User} u */
  u => {
    if (!Boolean(u) || !Boolean(u.email) || !Boolean(u.password)) {
      const message = `Need a {user: user, pass: mypass} to login! Received: ${
        u != null ? JSON.stringify(u) : 'null/undefined'
      }`;
      cy.log(message);
      throw new Error(message);
    }
    const userReq = { email: u.email, password: u.password };

    return cy
      .request('POST', `${Cypress.env('API_URL')}/users/login`, {
        user: userReq
      })
      .its('body')
      .then(v => {
        window.localStorage.setItem('jwtToken', v.user.token);
        return v.user;
      });
  }
);

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('jwtToken');
});

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
