# Workshop Angular

# Table of contents
- [Day 1](#day-1)
  * [Setup](#setup)
  * [1. Basic testing](#1-basic-testing)
  * [2. Basic testing - Dependencies](#2-basic-testing---dependencies)
  * [3. Basic testing - Using the CLI generated tests](#3-basic-testing---using-the-cli-generated-tests)
  * [4. TDD Test Driven Development](#4-tdd-test-driven-development)
- [DAY 2](#day-2)
  * [5. Automate unit test create/update](#5-automate-unit-test-create-update)
  * [6. Promise testing - async and fake async](#6-promise-testing---async-and-fake-async)
    + [6.1. Async testing](#61-async-testing)
    + [6.2. Fake async testing](#62-fake-async-testing)
  * [7. Observable testing](#7-observable-testing)
  * [8. Forms - Observable testing](#8-forms---observable-testing)
- [Day 3](#day-3)
    + [9. Setup E2E](#9-setup-e2e)
    + [10. E2E Tests](#10-e2e-tests)
      - [Demo Auth component Sign Up](#demo-auth-component-sign-up)
    + [11. End to end tests - Sign Up](#11-end-to-end-tests---sign-up)
    + [12. Key to end to end tests - login](#12-key-to-end-to-end-tests---login)
    + [13. Settings tests](#13-settings-tests)
    + [14. Articles](#14-articles)
    + [15. Comment](#15-comment)
- [Day 4. Performance](#day-4-performance)
      - [Bundle size](#bundle-size)
      - [Component performance](#component-performance)
    + [16. Bundle size](#16-bundle-size)
    + [17. Lazy loading](#17-lazy-loading)
    + [18. Removal of unused modules manually](#18-removal-of-unused-modules-manually)
    + [19. Manual JS lazy module load](#19-manual-js-lazy-module-load)
    + [20. Angular performance - trackBy](#20-angular-performance---trackby)
    + [21. Angular performance - OnPush](#21-angular-performance---onpush)
    + [22. Angular performance - debounce](#22-angular-performance---debounce)
- [Day 5. State management](#day-5-state-management)
    + [23. State management basic](#23-state-management-basic)
    + [24. State management - Service with a Subject - Facade](#24-state-management---service-with-a-subject---facade)
    + [25. NgRx Setup and replace User service](#25-ngrx-setup-and-replace-user-service)
    + [26. Incorporate User service into NgRx flow](#26-incorporate-user-service-into-ngrx-flow)
    + [27. Writing tests for classes using store](#27-writing-tests-for-classes-using-store)
    + [28. The effects test runner](#28-the-effects-test-runner)
        * [E2E tests using store](#e2e-tests-using-store)
    + [Bonus State management task](#bonus-state-management-task)
    + [Use the Chrome Performance tool](#use-the-chrome-performance-tool)
- [Resources](#resources)
- [NOTES](#notes)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# Day 1

## Setup

- fork/clone https://github.com/gparlakov/angular-realworld-example-app

  ```bash
  git clone https://github.com/gparlakov/angular-realworld-example-app
  ```
- install dependecies `npm install`

- install Angular CLI globally `npm i -g @angular/cli` (or use `npx` in front of `ng` command every time we need it. E.g. `npx ng generate component shared\notifications`)

- run the tests `npm test` or `npm test -- --watch` for continuous running tests

- [Switching Angular CLI generated Project to JEST_] setup jest - ([doc](https://github.com/briebug/jest-schematic#usage-))
  ```bash
  npm i -g @angular/cli @briebug/jest-schematic
  ng g @briebug/jest-schematic:add
  ```
  - if you don't want global install on any of those just use - `ng add @briebug/jest-schematic`. That will just do the install and not leave anything in the global `npm` folder (for version of angular less than 6 `npx -p @angular/cli@6.2.9 ng add @briebug/jest-schematic`)
  - `npm un @types/jasmine @types/jasminewd2` `npm i @types/jest` and change the types in tsconfig.spec.json (exclude jasmine and include jest)
- [Optional] debugging Jest tests from inside VS Code [article](https://medium.com/@gparlakov/debug-jest-tests-from-vs-code-bc691c949b07) and [Recipe from Microsoft](https://github.com/microsoft/vscode-recipes/tree/master/debugging-jest-tests)

## 1. Basic testing

Demo - on the [ListErrorsComponent](./src/app/shared/list-errors.component.ts)

## 1.1 Test the `ArticlePreviewComponent`

1.  Create a test file for the `./src/app/shared/article-helpers/article-preview.component.ts` - article-preview.component.spec.ts with the following contents:
    ```ts
    import { ArticlePreviewComponent } from './article-preview.component';
    import { Article } from '../../core';

    describe('ArticlePreviewComponent', () => {

    });
    ```
2.  Construct the component in a test case and verify it actually instantiates successfully
    - no dependencies
    - simple logic
    ```ts
    it('should instantiate', () => {
      const c = new ArticlePreviewComponent();

      expect(c).toBeDefined();
    });
    ```
3.  Test the `toggleFavorite` with argument `true`
    - add another `it` test case
        ```ts
          it('', () => {
          });
        ```
    - name it to explain what we'll do under what conditions and what we expect, for example:
        ```ts
          it('when toggleFavorite called with true should increase favoritesCount and toggle favorited true', () => {
          });
        ```
    - instantiate your class-under-test *CUT
        ```ts
          it('when toggleFavorite called with true should increase favoritesCount and toggle favorited true', () => {
            const c = new ArticlePreviewComponent();
            c.article = { favoritesCount: 0 } as Article;
          });
        ```
    - call the action method - what we do
        ```ts
          it('when toggleFavorite called with true should increase favoritesCount and toggle favorited true', () => {
            const c = new ArticlePreviewComponent();
            c.article = { favoritesCount: 0 } as Article;

            c.onToggleFavorite(true);
          });
        ```
    - finally add the expectation - test that we've received what we expect
        ```ts
          it('when toggleFavorite called with true should increase favoritesCount and toggle favorited true', () => {
            const c = new ArticlePreviewComponent();
            c.article = { favoritesCount: 0 } as Article;

            c.onToggleFavorite(true);
            expect(c.article.favoritesCount).toBe(1);
            expect(c.article.favorited).toBe(true);
          });
        ```
    - the end result should look a lot like:
      ```ts
        it('when toggleFavorite called with true should increase favoritesCount and toggle favorited true', () => {
          const c = new ArticlePreviewComponent();
          c.article = { favoritesCount: 0 } as Article;

          c.onToggleFavorite(true);
          expect(c.article.favoritesCount).toBe(1);
          expect(c.article.favorited).toBe(true);
        });
      ```
4.  Test the `toggleFavorite` with argument `false`
    ```ts
    it('when toggleFavorite called with false should decrease favoritesCount and toggle favorited to false', () => {
      const c = new ArticlePreviewComponent();
      c.article = { favoritesCount: 1, favorited: true } as Article;

      c.onToggleFavorite(false);
      expect(c.article.favoritesCount).toBe(0);
      expect(c.article.favorited).toBe(false);
    });
    ```
5.  Review. See [article-preview.component](files/src/app/shared/article-helpers/article-preview.component.spec.ts.help) for help



## 2. Basic testing - Dependencies

0. DEMO - using [snippets](https://github.com/BeastCode/VSCode-Angular-TypeScript-Snippets) to skip some of the code boilerplate
  - try using snippets like `t-describe-it` for the boilerplate
  - IntelliJ plugin for snippets (looks like it supports some snippets out of the box according to this [article](https://jaxenter.com/angular-2-intellij-netbeans-eclipse-128461.html)) https://plugins.jetbrains.com/plugin/8395-angular-2-typescript-live-templates/versions


1. Create the test file for the [AppComponent](./src/app/app.component.ts)
2. Test cases
   - it's constructed successfully
   - when ngOnInit will call the `populate` method on the `userService`
_Note: Running the tests - `npm test` or `npm test -- --watch` for continuous run_
3. Mock out the `UserService` dependency (using createSpy / _jest.fn_ for jasmine / _jest_ respectively)
   ```ts
   //jest
   const dep = { populate: jest.fn() as Function } as UserService
   // jasmine
   const dep = jasmine.createSpy('UserService', ['populate']) as UserService;
   ```
4. Add another dependency - the `NotificationService` (and/or `LogService`)
   - mock it and use the mock
5. Review
6. See [help](./files/src/app/app.component.spec.ts.help)

Did you instantiate the class-under-test in the test? Or some of the dependencies? What if there are many tests and the shape of some of the classes change? It might be the case that we are exposing implementation details in the tests...

## 3. Basic testing - Using the CLI generated tests

1. Create a new component using the `ng generate component shared/notifications` / `npx ng generate component shared/notifications`
   - this should generate 4 files - component, spec, html and css file
   - in the spec there is a scaffolded simple test case
2. Run `npm test -- --watch` (see the singe test pass)
3. Update the component
   - Update the content of the notifications.component.ts file with [contents from this file](./files/src/app/shared/notifications/notifications.component.ts.help)
      ```ts
      import { Component, OnInit } from '@angular/core';
      import { NotificationsService } from '../../core/services/notifications.service';
      import { NotificationModel } from '../../core/models/notification-model';
      import { Observable } from 'rxjs';

      @Component({
        selector: 'app-notifications',
        template: `
          <p *ngIf="success" class="notification notification-success">
            {{ success }}
          </p>

          <p *ngIf="error" class="notification notification-error">
            {{ error }}
          </p>
        `,
        styles: [
          `
            .notification {
              position: fixed;
              bottom: 0;
              right: 15px;
            }

            .notification-success {
              border: 1px solid green;
            }

            .notification-error {
              border: 1px solid magenta;
            }
          `
        ]
      })
      export class NotificationsComponent implements OnInit {
        success: string;
        error: string;
        constructor(private notifications: NotificationsService) {}

        ngOnInit() {
          this.notifications.message$.subscribe(m => {
            if (m.type === 'success') {
              this.success = m.text;
            } else {
              this.error = m.text;
            }
          });
        }
      }
      ```
   - we added injected dependency - the `NotificationService` to showcase testing components with dependencies
4. Add a test for the case of success and for the case of error (populates the correct input) (see [help](./files/src/app/shared/notifications/notificatons.component.spec.ts.help)).
  - 4.1. The "success" case:
    - we can start with a failing test
      ```ts
        it('when "success" type message arrives it should populate the success', () => {
            expect(component.success).toEqual('A success message');
        });
      ```
    - we need to call
        ```ts
        component.ngOnInit()
        ```

    - broken because the service is `undefined` at this point - let's provide it
        ```ts
          TestBed.configureTestingModule({
          //...
          providers: [
            { provide: NotificationsService, useValue: {} as NotificationsService }
          ]
        ```
    - still broken since the service does not expose the `messages$` property, so let's provide that (importing the `of` function from `rxjs` as well as `NotificationModel`)
        ```ts
          import { of } from 'rxjs';
          import { NotificationModel } from 'src/app/core/models/notification-model';
          // ...
          TestBed.configureTestingModule({
          //...
          providers: [
          {
            provide: NotificationsService,
            useValue: { message$: of({} as NotificationModel) } as NotificationsService
          }
        ]
        ```
    - still broken - as the 'message' we send is just an empty object `{}` so let's change that
        ```ts
          useValue: {
            message$: of({ type: 'success', text: 'Tes message' } as NotificationModel)
          } as NotificationsService
        ```
    - whoops, still broken. Notice the error message. Let's fix it
        ```ts
        useValue: {
          message$: of({ type: 'success', text: 'A success message' } as NotificationModel)
        } as NotificationsService
        ```
    - Green test! Awesome!
  - 4.2. The error case (using some CPDD - copy paste driven development :)
    - let's start with a copy-paste of our previous test, rename it and change the expectation
        ```ts
        it('when `error` type message arrives it should populate the error property', () => {
          component.ngOnInit();
          expect(component.error).toEqual('An error message');
        });
        ```
    - broken because our setup caters fro the success case only - so let's change that. We'll create a `Subject` of type `NotificationModel` and give that to the `NotificationsService` in the providers of our `TestBed` module
        ```ts
          const messages$ = new Subject<NotificationModel>();

          beforeEach(async(() => {
            TestBed.configureTestingModule({
              declarations: [NotificationsComponent],
              providers: [
                {
                  provide: NotificationsService,
                  useValue: {
                    message$: messages$ as Observable<NotificationModel>
                  } as NotificationsService
                }
              ]
            }).compileComponents();
          }));
      ```
    - and now both the **success** test and the **error** one are broken.To fix the **success** test let's emit a message:
        ```ts
        //...
        component.ngOnInit();
        messages$.next({ type: 'success', text: 'A success message' });
        expect...
        ```
    - now to finish the **error** test case we need to simply emit the correct message:
        ```ts
        //...
        component.ngOnInit();
        messages$.next({ type: 'error', text: 'An error message' });
        expect...
        ```
    - Awesome we have Green tests!
    - What would happen if we emit before `ngOnInit();`?
      - How can we mitigate? (Behav Subj)

5. Review
6. Don't forget to add the component in the `app.component.html` (just uncomment it)

## 4. TDD Test Driven Development

1. Create a `log.service.spec.ts` \*use t-describe-it (if available)
2. Import the LogService from `./log.service`
3. Run the `npm test -- --watch log --no-cache` to run the log service tests in watch mode
4. See the failure
5. Create the `log.service` file
  - with content
    ```ts
    export class LogService {}
    ```
  - all green
6. Create a `it` test case that the LogService instantiates
7. See it fail - create LogService class - all green
8. Add a `it` test case that the `error` method invokes `console.log` method
9. See it fail
  - add the logic
    ```ts
    error() {
      console.log();
    }
    ```
  - all green
10. Add a `it` test case that when `error` invoked with an `Error` the console.log is invoked with the message.
  - to mock the `console.log` we can `console.log = jest.fn()`
11. See it fail
  - add the logic
    ```ts
    error() {
      console.log();
    }
    ```
  - all green

12. Congrats - now you are a TDD dev!
13. Review
14. See [help](./files/src/app/core/services/log.service.spec.ts.help)

# DAY 2

## 5. Automate unit test create/update

`npm i -g @angular/cli`

0. Demo - `setup` function create manually from scratch (`NotificationsService` spec)
   - `setup` houses the instantiation of class-under-test and its dependencies (otherwise done by Angular)
   - also it helps if test conditions are placed in the `builder`
   - helps in getting back control over instantiation, in maintaining the specific format of the tests which allows for **Automating** them

1. Install/update `npm install --save-dev scuri@latest` (or short `npm i -D scuri@latest`)
2. Run `ng g scuri:spec src\app\shared\layout\header.component.ts` (might need to `npx ng g scuri:spec src\app\shared\layout\header.component.ts` if no ng cli installed globally)
  - notice that it's using `autoSpy`
  - autospy will get a Function (`UserService`) and create a mock for each of its "public" methods - that is each method that's part of the `UserService.prototype`
    - autospy will not populate properties - so we need to (in this example that is `UserService.currentUser` - it should be an observable so that `.subscribe()` method exists on it)
3. Run `ng g scuri:autospy --for jest` to generate the autospy (or `npx ng g scuri:autospy`)
   - move the created `auto-spy.ts` to `./src/app/auto-spy.ts`
4. Add the paths to tsconfig.json ([help](./files/tsconfig.json.help))
   ```json
   {
     "baseUrl": ".",
     "paths": {
       "autoSpy": ["./src/app/auto-spy"]
     }
   }
   ```
5. Add the path to jest.config.js (if applicable) ([help](./files/jest.config.js.help))
   ```js
    moduleNameMapper: {
      ...
      'autoSpy':'<rootDir>/src/app/auto-spy.ts'
    }
   ```
6. Run `npm test` (or `npm test -- --watch`)
7. Review
8. We'll finish the test cases for `header.component` later - after 7.
## 5.1. Merging into existing tests
  - Run `ng g scuri:spec --name ./src/app/shared/notifications.component.ts --force`
    - overwrites the existing notifications component tests, but we can "merge" them
  - Using the diff tool from git/VS Code/IntelliJ we can merge the previous spec test with the current version

## 6. Promise testing - async and fake async

### 6.1. Async testing

1. Create a `profile-resolver.service.spec.ts` (try using SCuri `ng g scuri:spec profile\profile-resolver.service.ts`)
2. Create a test case for `when resolve is called and the profileService.get rejects should call router.navigateByUrl("/")` (if using scuri - just use the scaffolded test and just rename it)
  - we need to have a method that sets up a rejection after `profileService.get` is called so :
      ```ts
      withGetProfileRejects() {
        profilesService.get.mockReturnValue(Promise.reject());
        return builder;
      }
      ```
  - call that in our test
      ```ts
      setup().default().withGetProfileRejects();
      ```
  - we need to mock the route passed in
      ```ts
      c.resolve({ params: { username: 'my' } as Params } as ActivatedRouteSnapshot, null);
      ```
      - should be enough because we are testing the `catch` code path so the input would be largely ignored
  - now we can assert that `router.navigateByUrl` has been called with '/' (hint use `toHaveBeenCalledWith('/')`)
  - but it says it has not been called (even worse - if we try debugging we'll see that at actually gets called!!!)
3. Use `async` to wrap it (`import { async } from '@angular/core/testing';`)
  - wrap the `it` callback with
      ```ts
      it('name', async(() => {
        ///
      }});
      ```
  - now it still does not pass because we need to return a promise from our test in order for the `async` to work
      ```ts
      c.resolve({ params: { username: 'test' } } as any, null).then(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      });
      ```
  - async waits for each promise (created in its context) to resolve before continuing
4. Create a test case for `when resolve is called it should call the profileService.get with the "username" param`
  - we need to return a promise from `profileService.get()` - so use
    - `builder.default()` - this would make getting the profile the `default` case - our green path
    - or a separate method `builder.withProfilesServiceResolving(to: Profile)` if that's more convenient
5. Review
6. See [file](files/src/app/profile/profile-resolver.service.spec.ts.help) for help

### 6.2. Fake async testing

_Example for microtasks using the [flushMicrotasks thing](https://medium.com/ng-gotchas/what-was-that-flushmicrotasks-thing-again-4cfae7ba5fac) article and [presentation](https://docs.google.com/presentation/d/1_5-p0t_FtKYDKJgqWZYNyJ3NsR2U8J5kY2ZHPmare1w/edit?usp=sharing)._

1. Create a `article.component.spec.ts` file with the test infrastructure - `describe` with an `it` ...
  - if using scuri - comment out the `it`-s (or just the error-ing lines of code) except for the one with `populateComments` method (4-th one):
2. Create a test case(or rename scaffolded) `when populateComments is called and getAll comments promise resolves it should set the comments to the result`
  -  `import { Comment } from '../core';`
  - create a method in builder
      ```ts
      withCommentsResponse(comments: Comment[]) {
        commentsService.getAll.mockReturnValue(Promise.resolve(comments));
        return builder;
      }
      ```
  - call it in the test
  - we'll need to wrap the `it` callback with `fakeAsync(() => {/*the test */})`
  - and call `flushMicrotasks()` just after `c.populateComments` has been called in order to force the promise to get resolved and call its `.then(() =>{})` callback
  - what if `getAll` rejects? - maybe add a test case for that too
4. Add a test case for `addComments` promise resolves
5. Add a test case for `addComments` promise rejects
6. Add a test case for `deleteComment` success
7. Review
8. See [help](./files/src/app/article/article.component.spec.ts.help) file

### 7. Observable testing

1. Start `user.service.spec.ts` - manually, snippet or scuri
2. Add test case `when populate called and token in localStorage and user fetch succeeds should emit the user`
  - use `default` builder method to house the default setup
    ```ts
    default() {
      jwtService.getToken.mockReturnValue('token');
      apiService.get.mockReturnValue(of({}));
      return builder;
    },
    ```
  - OR use separate methods for each dependency
  - we need to subscribe to `currentUser` to check our expectations
      ```ts
      let value;
      c.currentUser.subscribe(u => value = u);
      //...
      expect(value).toEqual({/** the expected user value*/})
      ```
3. Add test case `when populate called and token in localStorage and user fetch succeeds should emit isAuthenticated`
  - we should be able to reuse the existing setup
  - again, we need to subscribe to `isAuthenticated` (see 4.)
4. Try subscribe utility [subscribe-in-test](./src/app/testing/subscribe-in-test.ts)
  - it allows for one-liner subscribes with a specified number of emissions or takeUntil logic with another observable (`subscribe(obs$ , destroy$)` - will get the values from `obs$` until `destroy$` emits and then it will stop and unsubscribe)
5. Add test case `when populate called and empty token in localStorage should emit the empty user and isAuthenticated false`
  - reuse the setup with adding a method `withEmptyToken` in the our setup builder object
6. Add test case `when attemptAuth called and POST succeeds should emit "success" and currentUser should also emit`
  - we'll need a `withApiServicePostReturning` method in our setup builder object
  - what if `type` is `login` and if it's something else
    - it should call the same method `this.apiService.post()` with difference in arguments - once with `/users/login` and the other time with `/users` and both of those cases pass in user credentials
7. Add test case `when attemptAuth called and POST fails should emit the error and current user should not emit`
  - we can extend the `withApiServicePostReturning(p: Promise<any> | any)` or add a new method
    - `withApiServicePostRejecting()` - either way is fine
  - we need to cover our error case
    - `subscribe` will aggregate errors right alongside rest it the values array
8. [Optional] Test the rest of the methods - `update`, `purgeAuth`(is this already tested?) and `getCurrentUser`
9. Review.
10. See [help](files/src/app/core/services/user.service.spec.ts.help)

### 8. Forms - Observable testing

1. `auth.component` - start test (automate?)
2. Add test case for `when instantiated the form group should have "email" and "password" controls"`
  - just instantiate the class and do the assertions
  - assert that we actually get a control
      ```ts
      expect(c.authForm.get('email').value).toEqual('');
      expect(c.authForm.get('email').validator).toEqual(Validators.required);
      ```
  - similar for the `password` form control
2. Add test case for `when ngOnInit is called and url ends with 'login' should set title and authType`
  - create a `withRoute(endingIn:'register' | 'login')` method and make sure `this.route.url` is an observable
3. Add test case for `when ngOnInit is called and url ends with 'register' should set title and authType and add a 'username' control`
4. Add test case `when submitForm called it should set the isSubmitting to true and clear out the errors`
5. Add test case `when submitForm called it should call attemptAuth with the auth type and credentials`
  - should make sure that `this.userService.attemptAuth` returns an observable
  - `builder.withAttemptAuthSuccess()` or define that in `builder.default()` since it's the default case
6. Add test case `when submitForm called and attemptAuth result emits it should navigate to /`
  - reuse the setup from previos point
7. Add test case `when submitForm called and attemptAuth result emits error it should set errors and isSubmitting to false`
  - a new method `withAttemptAuthRejecting()`
8. See [help](./files/src/app/auth/auth.component.spec.ts.help)
9. Review

### 8.1. Finish testing Header component
1. We can now continue and add tests for the header component
  - finish the test name which was scaffolded `it('when ngOnInit is called it should subscribe to currentUser, () => {`
  - we need a subject to subscribe to. Let's create a `withUser` method on our builder object:
      ```ts
      withUser(u: User) {
          userService.currentUser = of(u);
          return builder;
      },
      ```
  - now we need to call it(`withUser` method) in the test
      ```ts
      setup().default().withUser({email: 'my@email.co'} as User)
      ```
  - now after `ngOnInit` there should be a user in `c.currentUser`
      ```ts
      expect(c.currentUser).toEqual({email: 'my@email.co'});
      ```
# Day 3

### 9. Setup E2E

1. Install cypress `npm i cypress -D`
2. Run it `npx cypress open` or `node_modules\.bin\cypress open`
  - Add to package.json scripts:
      ```json
      "scripts": {
        //...
        "cypress": "cypress",
        "cypress.open": "npm run cypress open"
      }
      ```
3. Add `{"baseUrl": "http://localhost:4200"}` to `cypress.json`
4. Add `"allowJs": true, "checkJs": true` to tsconfig.json to allow ts to check our js test files
5. [Optional] hide the examples from our dashboard by adding `"ignoreTestFiles": "**/examples/*.*"` to `cypress.json`

### 10. E2E Tests

#### Demo Auth component Sign Up

1. Demo running tests
2. Demo `examples` and how they are excluded from general runs
3. Demo anonymous user - should see the banner and sign up/sign in buttons
4. Demo sign-up tests [demo help](./files/cypress/integration/sign-up/sign-up.spec.js.help) \
5. Mention the selectors, `data-testid`. Classes, ids and attributes change for UI reasons so let `data-testid` be the constant that we can anchor out tests at.

### 11. End to end tests - Sign Up

1. Create a folder in `cypress\integration\app\sign-up` and `sign-up.spec.js`
2. Create a test case `should see the sign-up form with 2 "text" inputs - user and email`
  - first - navigate to the correct location (make sure the `baseUrl` is set in cypress.json)
      ```ts
      cy.visit('/register');
      ```
  - we'll need to use `cy.get(...)` and combine it with `should` ([example](cypress\integration\examples\querying.spec.js#l14)):
      ```ts
      cy.get('input[formcontrolname=username]').should('be.visible');
      ```
3. Create a test case `should see the sign-up form with 1 "password" input`
  - try selecting with `cy.get('input[type=password]`)
4. Create a test case `should create user successfully and redirect to /`
  - we can type in a selected input by using `cy.type` ([example](cypress/integration/examples/actions.spec.js#l12))
      ```ts
      cy.get('input[formcontrolname=username]').type(randUser + 'myname');
      ```
  - hint - to workaround existing users create a random string of some sort - for example `Math.random().toString(36).slice(2)`

5. Review
How do we know we've successfully created a user? From the UI navigation to a different page? From the response returned by the API?

### 12. Test Sign In page

1. We'll need to create a `register` which registers a user using the API (and NOT the SignUp page). Why?
  - Faster tests
  - Make our `Sign In` tests independent of the `Sign Up` page. If `Sign Up` page is down we can still test the `Sign In`
2. Create the `register` helper command - [command](./files/cypress/support/commands.js.help)
3. Add the `"env": {"API_URL": "https://conduit.productionready.io/api"}` in `cypress.json` (there is a `cypress.json.help` file in `/files`)
4. For intellisense help add a `tsconfig.json` in `./cypress` with the following content:
    ```json
    {
      "compilerOptions": {
        "baseUrl": "./",
        "typeRoots": ["../node_modules/cypress/types", "./support/index.d.ts"],
        "checkJs": true,
        "allowJs": true
      }
    }
    ```
  - and a `./cypress/support/index.d.ts`
      ```ts
      /// <reference types="cypress" />

      declare interface User {
        email: string;
        username: string;
        password: string;
      }

      declare namespace Cypress {
        interface Chainable<Subject> {
          register(): Chainable<User>;
        }
      }
      ```
5. Create a a `sign-in.spec.js` file
6. Test that sign in UI is in place (inputs and buttons)
7. Test that that `a registered user can successfully sign in`
  - Use the register command to create a user
      ```ts
      const user = cy.register()
      ```
  - use the email and password from this new user (`user`) and fill in the inputs
  - click on the button and send the request
  - check that the response status is 200

Review.
8. See [help](files/cypress/support/commands.js.help)

### 13. Settings tests

0. Begin with adding a `login` command - see [help](files/cypress/support/commands.v2.js.help)

1. Create the `./cypress/integration/settings/settings.spec.js`
   ```js
    context('Settings', () => {
     /**  @type User */
     let user;
     beforeEach(() => {
       cy.register().then(u => (user = u));
       cy.visit('/settings');
     });
   });
   ```
2. Add test case `should be visible for logged in users`
  - we need to register a user (why not use an existing user?)
  - verify that the settings UI is visible. Example:
      ```ts
      cy.getcy.get('h1').should('have.text', 'Your Settings');
      ```
3. Add test case `should have the user name and email pre-filled`
  - assert the username and email equal the ones from the registered user - `user`
4. Add test case `should log out successfully`
  - how do we verify user has logged out successfully?
5. Review
6. See [help](files/cypress/integration/settings/settings.spec.js.help)

### 14. Articles

1. Create the `articles.spec.js`
2. Add test case authenticated user can see UI for writing and article
3. Add test case authenticated user can publish article
  - verify using `cy.server()` and then `cy.route(/publish/).as(publish)`
      ```ts
      cy.server() // start listening for requests and responses
      cy.route('POST', 'api/articles').as('publish')
      //... fill in the inputs and click the submit button
      cy.way('@publish').its('status')
        .should('be', 200)
      ```
  - waiting for the response from the API it by far the most robust and non-fragile way to structure your tests
4. Review ([help](files/cypress/integration/article/article.spec.js.help))

### 15. Comment

1. Create the `comments.spec.js`
2. Start with an article creation logic using the API (need a token first)
    - consider using `before` (called once before all tests) or `beforeEach` (called before each test) to create an **article** on which to do the **comment** tests
    - register a user using the `cy.register` command.
    - login with the new user using the `cy.login` command (via the API)
    - now we have a token - use that in next step
    - now send a POST to the article create API endpoint `/articles`
    - at this point  we are ready to use the newly created article to do some testing
3. Add test case authenticated user can comment
5. Add test case anonymous user can not comment
6. Review ([help](files/cypress/integration/comments/comments.spec.js.help))

# Day 4. Performance
 We'll tackle performance in two aspects
#### Bundle size
  - for quick download - users accustomed to immediate app response
  - don't download js for features user won't use ( < 1% will be admins - no need for admin module eagerly)

#### Component performance
  - make *ngFor great again - `trackBy`
  - leverage the observable state and switch to `OnPush` strategy
  - a `debounce` RxJs trick

### 16. Bundle size

1. Run `npm i -g webpack-bundle-analyzer` see [help](webpack-bundle-analyzer)
2. Run `ng build --prod --stats-json`
3. Run `webpack-bundle-analyzer dist/stats.json` (keep tab open for comparison)
4. Notice

   - settings and article modules not lazy
   - all moment locales - even though we need only few of them - us/ru

5. Explore what Angular does automatically with the tree shaker
   - Run `ng build ts --prod --common-chunk false --stats-json && webpack-bundle-analyzer dist/ts/stats.json` (notice we are building the [tree shake (ts) demo project](./projects/ts/src/app/app.component.ts))
   - Checkout the `main`, `secondary` and `third` components and see that **only** the used components end up in the bundles, even though using the shared module and its shared components

6. Demo what Angular 8 CLI does for us in terms of performance. (_assumes user is running angular pre 8_)
     - `ng update @angular/cli @angular/core`
     - `ng build ts --prod --common-chunk false --stats-json` (notice we build `ts` app))
     - `webpack-bundle-analyzer dist/ts/stats-es2015.json`
     - navigate to `localhost:8888`
7. **Angular 8** requires **Node 10**. If running another version either:
   - install Node 10 locally and run the above commands
   - run Docker node:10 container
     - `docker run -p 8888:8888 gparlakov/demo-ivy` (_I've prepared this container to skip installing the **dependencies** - feel free to run the official node:10 image_)
     - navigate to `localhost:8888`

   - using NVM (node version manger)
     - install nvm ([linux/MacOs](https://github.com/nvm-sh/nvm)) ([windows](https://github.com/coreybutler/nvm-windows))
     - run `nvm install 10.13.0`
     - run `nvm use 10.13.0`
     - run the commands
        - `ng update @angular/cli @angular/core`
        - `ng build ts --prod --common-chunk false --stats-json` (notice we build `ts` app))
        - `webpack-bundle-analyzer dist/ts/stats-es2015.json`
8. Notice how much has changed
  - legacy browsers get their own build with larger polyfill js and modern ones, which do not need all those polyfills get the smaller bundle - neat


### 17. Lazy loading

1. Make Article module lazy
   - remove ArticleModule from AppModule
   - make the route use `loadChildren: "./article/article.module#ArticleModule"`
2. Make Settings module lazy - same steps as above
3. Note the bundles sizes change (run steps 2. and 3.)
   `ng build --prod --stats-json && webpack-bundle-analyzer dist/stats.json`
4. Review
5. See [app-routing.module.ts](files/src/app/app-routing.module.ts.help) and [app.module.ts](files/src/app/app.module.ts.help)

### 18. Removal of unused modules manually

1. Check out the moment locales (keep the browser tab open for comparison)
2. Add `"postinstall": "node ./tools/remove-unused-locales.js"` to `scripts` section of package.json
3. Run `npm i` to invoke the post install hook script
4. `ng build --prod --stats-json` and `webpack-bundle-analyzer ./dist/stats.json` and `` and see the bundle size differ
5. Review
   // Demonstrate how to remove the moment js (or any other) locales not in use

### 19. Manual JS lazy module load

1. Notice the `Pusher` is a large part of our main bundle. Turns out the user needs to agree for us to send them notifications. Let's make the pusher module lazy loaded - that's a JavaScript module (vs Angular Module - which gets lazy loaded via Routes primarily though there are [options](https://www.npmjs.com/package/@herodevs/hero-loader))
2. Notice [pusher-service.ts](src/app/core/services/pusher.service.ts). It imports the Pusher library - no matter if anyone uses it or not:
   (i.e. if `I want notifications` has been pressed)
   `ts import * as Pusher from 'pusher-js';`
3. In order to lazy load that module we need to:
   - change the `module` setting in `tsconfig.app.json` to `esnext`
     ```json
     "module": "esnext"
     ```
   - replace `getPusherInstance` method in pusher service with:
     ```ts
       private getPusherInstance() {
         return import('pusher-js').then((p: any) => {
           if (this.instance == null) {
             // we know this is imported as { default: PusherStatic } contrary to what our import types this as
             const Pusher: Pusher.PusherStatic = p.default;
             this.instance = new Pusher(this.key, this.config);
           }
           return this.instance;
         });
       }
     ```
4. Now run the `ng build --prod --stats-json && webpack-bundle-analyzer dist/stats.json` and notice now Pusher has its own bundle
5. Review (see [help](files/src/app/core/services/pusher.service.ts.help))

### 20. Angular performance - trackBy
See Chrome performance [below](#use-the-chrome-performance-tool)
1. Notice the /admin route of the app. Interact with the controls on the left (width, height, by) and notice the updating count of all components. That's because we keep changing the referenced objects filtered and updated by the [admin-article.service](src/app/admin/admin-article.service.ts#l23) with the input provided in the admin-article-visualize-control.component (i.e. the aforementioned controls - width, height, by).
2. Add a `articleSlug` property in the `admin-article-list.component`
3. Let it be of type `TrackByFunction<AdminArticle>`
4. Assign a function to the property that accepts index and an item if type `AdminArticle` and return the slug of the article.
5. Now notice the template of `admin-article-list.component`.
6. Add a `;trackBy=articleSlug` to the end of the `*ngFor` declaration. That will instruct Angular to take the returned value and check that for equality with the previous one instead of just comparing object references.
7. Notice how the controls no longer cause the redrawing of the whole list and rather make the existing components change.
8. Review (for help see [component](files/src/app/admin/admin-article-list/admin-articles-list.component.ts.help) and [template](files/src/app/admin/admin-article-list/admin-articles-list.component.html.help))

### 21. Angular performance - OnPush

1. Notice the `/admin/on-push` route. See how writing in the input triggers change detection in all of the `admin-article.component`-s with no visible changes.
2. This happens because the ngFor difference strategy relies on object reference comparison and since `admin-article.service` emits a new object every time, Angular has to destroy the component and create a new one for the new object reference. We **`can`** affect that by the `trackBy` input of the ngFor structural directive
3. Adjust the change detection strategy of the `admin-article.component` to on-push.
4. Try typing in the input again and notice if the change detection is triggered in the article
5. Review (for help see [admin-article.component.ts.help](files/src/app/admin/admin-article/admin-article.component.ts.help))

### 22. Angular performance - debounce

1. Notice the `/admin/debounce` route.

2. The `admin-search.component` initializes the search by providing the changes observable. Then the `admin-article.service` will construct the (mock) request out of each emission of that observable.
3. The effect is manifested by typing in the search resulting in a **request** for **each** typed character
4. Apply the `debounceTime` operator in the `admin-search.component` (ex `debounceTime(400)`)
5. Notice that the request waits for you to finish writing before sending the request (mock request)
6. Review (for help see [component](files/src/app/admin/admin-search/admin-search.component.ts.help))

# Day 5. State management

In medium and large sized apps a lot of (incidental) complexity gets added because of shared state. Let's look at a few points demonstrating different approaches to state management.

### 23. State management basic

1. Go to https://angular.io/generated/live-examples/getting-started/stackblitz.html and get to know the app
2. Implement the following feature
   - show the number of items next to the `Checkout` button <img src ="./files/button.png" width="100" alt="![huhh! the button.png is missing]"></img>
3. Steps:
   - notice the state being kept in the `CartService`
   - notice the button being part of the `TopBarComponent`
   - inject the `CartService` in the `TopBarComponent`
   - populate a `itemsCount` property with `cartService.getItems().length`
   - notice that no changes are happening - why is that?
   - implement a `ngDoCheck` method (when does it get called?)
   - inside re- populate a `itemsCount` property with `cartService.getItems().length` (i.e. `this.itemsCount = this.cartService.getItems().length`)

4. Review.
5. For help see [final result](https://stackblitz.com/edit/angular-data-simple-angular-advanced-workshop-kiev?file=src/app/top-bar/top-bar.component.ts)

### 24. State management - Service with a Subject - Facade

1. Notice the `user.service.ts`. It has methods for initiating the user, purging the auth info and exposes the current user state as an observable.
  - This is what some call [Facade](https://medium.com/@thomasburlesonIA/ngrx-facades-better-state-management-82a04b9a1e39) others [Subject service](https://medium.com/@weswhite/angular-behaviorsubject-service-60485ef064fc)
  - Very nice property of this abstraction level is that it's easy to start and feels natural, which is not the case with say NgRx and the whole Redux parade of actions, reducers, selectors, effects, containers and so on...
  - Also when/if project decides to move to a more involved data management solution like Akita or NgXs or NgRx the Service can stay and work with that or beside it with little change required.
  - can serve as a stepping stone to a more powerful state management.
2. For now we'll do nothing but get to know the `user.service.ts` and later we'll try and revisit it

### 25. NgRx Setup and replace User service
  - docs [NgRx](https://ngrx.io/docs)
  - Keep in mind that importing from `src/app/..` might break the build. To fix edit `src/tsconfig.app.json` replace `"baseUrl":"./"` with `"baseUrl":"../"`
    - _why? because the tool you are using(VSCode/other) will probably use the `tsconfig.json` from the root folder and import using it's `baseUrl` as a reference, while the Angular build uses `tsconfig.app.json` (see [angular.json line 17](angular.json#l17))_

1. Setup. By using the `ng add`, which in turn uses the `Schematics` capabilities we can quickly setup ngrx in our app with minimal manual steps
   - `ng add @ngrx/schematics --defaultCollection false` - add a schematic to assist in creation of new reducers/actions/effects
   - `ng add @ngrx/store --statePath state` - the base of the NgRx Redux implementation - the store, reducer, action etc types and helpers
   - `ng add @ngrx/store-devtools` - instrument for use with the Redux DevTools Extensions http://extension.remotedev.io/
   - `ng add @ngrx/effects` - add the effects part of NgRx - handles side effects like persist etc.
   - IMPORTANT verify installed versions of @ngrx libs are **8.4.0** (or above) in package.json. See help branch from the last point of this part (25.10)
2. User state (reducer)

   - `ng g @ngrx/schematics:reducer state/user/user -c` - creates the user reducer under state/user folder (we'll keep the state separated by feature rather than by type i.e. state/user and state/articles vs state/reducers/user.reducer.ts and state/reducers/article.ts)
   - in the `user.reducer.ts` file

     - add to the `State` `user: User` and the `initialState` to `{user: User.empty}` (importing the `User` type)

       ```ts
       export interface State {
         user: User;
         loading?: boolean;
       }

       export const initialState: State = {
         user: User.empty
       };
       ```

   - in the `state/index.ts` file import the just created State and reducer and add them to the app's state

     ```ts
     import {
       userFeatureKey,
       State as UserState,
       reducer as userReducer
     } from './user/user.reducer';

     export interface State {
       [userFeatureKey]: UserState;
     }

     export const reducers: ActionReducerMap<State> = {
       [userFeatureKey]: userReducer
     };
     ```

3. User actions
   - `ng g @ngrx/schematics:action state/user/user --api --creators` - create the action file and scaffold the users load action
   - rename `loadUsersFailure` `loadUsersFailure` and `loadUsersFailure` to `loadUserFailure` `loadUserFailure` and `loadUserFailure` - we are loading a single user
   - rename `[User] Load Users` to `[User] Load User` - same reason
     - Why do we need the `[User]` thing?
4. User effects
   - `ng g @ngrx/schematics:effect state/user/user --module app --root` - to create the user effect class and add the it to app root's effects
   - inject `ApiService` and the `JwtService` in the newly created `user.effects.ts`
     ```ts
     constructor(private actions$: Actions, private api: ApiService, private jwt: JwtService) {}
     ```
   - implement the `loadUser` effect
     ```ts
     loadUser = createEffect(
       () =>
         this.actions$.pipe(
           ofType('[User] Load User'),
           switchMap(_ => {
             return this.jwt.getToken()
               ? (this.api.get('/user') as Observable<{ user: User }>)
               : of({ user: User.empty });
           }),
           map(d => loadUserSuccess({ data: d.user }))
         ),
       {}
     );
     ```
5. Initiate user loading with starting the app

- inject the `Store` in the `app.module`'s constructor (that's **not** the app.component)
  ```ts
  constructor(store: Store<State>) {
    store.dispatch(loadUser());
  }
  ```
- open the ReduxDevTools console and watch for the emitted events. You should see both `[User] Load User` and `[User] Load User Success`

6. Update the reducer -
   - in `user.reducer.ts` import the actions from `user.actions.ts` i.e. `userLoadSuccess`, etc.
   - then update the reducer
     ```ts
     export const reducer = createReducer(
       initialState,
       // initially set the loading to true
       on(loadUser, state => ({ ...state, loading: true })),
       // when load succeeds - set the user and stop the loading
       on(loadUserSuccess, (state, action) => ({ ...state, user: action.data, loading: false })),
       // on failure - add the error and stop the loading
       on(loadUserFailure, (state, action) => ({
         ...state,
         user: User.empty,
         loading: false,
         error: action.error
       }))
     );
     ```
     - notice how you get type safety in the function implementing the reduction of the state - the action is of the expected type - thanks @ngrx/store
   - open the ReduxDevTools console and now you should see change of the store too
7. Add selectors for user state
   - in `user.reducer.ts` add the following selectors definition
     ```ts
     export const userState = createFeatureSelector<State>(userFeatureKey);
     export const userSelector = createSelector(
       userState,
       s => s.user
     );
     ```
8. Update `Header` component

- in `header.component.ts` inject `Store` in the constructor and select the user:
  ```ts
    currentUser$: Observable<User> = this.store.pipe(select(s => userSelector(s)));
    // no need to provide type for store at this point - up to you
    // would be State<AppStore> where import {State as AppStore} from 'state';
    constructor(private userService: UserService, private store: State<any>) {}
  ```
- in `header.component.template.html` wrap the current user view with a `ng-container` and extract the current user from `currentUser$` i.e. replace lines 63-70 with
  ```html
  <ng-container *ngIf="currentUser$ | async as currentUser">
    <li class="nav-item">
      <a
        class="nav-link"
        [routerLink]="['/profile', currentUser.username]"
        routerLinkActive="active"
      >
        <img [src]="currentUser.image" *ngIf="currentUser.image" class="user-pic" />
        {{ currentUser.username + ' from store' }}
      </a>
    </li>
  </ng-container>
  ``
  ```
- verify user email is still visible

9. Review.
  9.1. What we did
    - we set up NgRx root using it's schematics.
    - then created a reducer, some actions, selectors, an effect to handle user load, load success and failure
    - then replaced the current `user` data management with the store, action and effects
  9.2. What we accomplished
    - lay the foundations of using the Redux pattern in our app
    - began our journey in the NgRx land

10. See branch [feature/ngrx](https://github.com/gparlakov/angular-realworld-example-app/tree/feature/ngrx) for help or simply checkout

### 26. Incorporate User service into NgRx flow

This point will demo how to incorporate or bring along services implemented using the Subject Service/Facade patterns mentioned above

1. We'll retouch the `user.service` and incorporate it in the NgRx flow
2. In `user.actions.ts` add the following action
    ```ts
    export const clearUser = createAction('[User] Clear User');
    ```

    - that will be the signal to remove user from store and tokens from JasonWebToken local storage

3. In `user.effects` change the class to the following
    ```ts
    @Injectable()
    export class UserEffects {
      loadUser = createEffect(
        () =>
          this.actions$.pipe(
            ofType('[User] Load User'),
            switchMap(_ => {
              return this.jwt.getToken()
                ? (this.api
                    .get('/user')
                    // if get user fails - emit the empty user
                    .pipe(catchError((u, e) => of({ user: User.empty }))) as Observable<{
                    user: User;
                  }>)
                : // if no tokens - emit the empty user
                  of({ user: User.empty });
            }),
            map(u =>
              u == null || u.user === User.empty ? clearUser() : loadUserSuccess({ data: u.user })
            )
          ),
        {}
      );

      clearUser = createEffect(
        () =>
          this.actions$.pipe(
            ofType('[User] Clear User'),
            tap(() => this.jwt.destroyToken())
          ),
        { dispatch: false }
      );

      constructor(private actions$: Actions, private api: ApiService, private jwt: JwtService) {}
    }
    ```

    - the `loadUser` effect is extended to emit the `clearUser` action if fetch fails or there are is no token in local storage
    - adding the `clearUser` effect to clear the Jason Web Token from local storage
    - `clearUser` will not emit any more actions so we set `dispatch: false`
4. Update the reducer  `user.reducers`
    - add a reducer fot the `clearUser` action:
        ```ts
        on(clearUser, state => ({...state, user: User.empty}))
        ```
    - that will take care to set the user in store to the Empty User

5. Update the `user.service`
    ```ts
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { select, Store } from '@ngrx/store';
    import { Observable } from 'rxjs';
    import { map } from 'rxjs/operators';
    import { clearUser, loadUser } from '../../state/user/user.actions';
    import { userSelector } from '../../state/user/user.reducer';
    import { User } from '../models';
    import { ApiService } from './api.service';
    import { JwtService } from './jwt.service';


    @Injectable()
    export class UserService {
      public currentUser = this.store.pipe(select(userSelector));

      public isAuthenticated = this.currentUser.pipe(
        map(u => u && u !== User.empty && u.token !== null)
      );
      user: User;

      constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService,
        private store: Store<any>
      ) {}

      // Verify JWT in localstorage with server & load user's info.
      // This runs once on application startup.
      populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
          this.store.dispatch(loadUser());
        } else {
          this.store.dispatch(clearUser());
        }

        this.currentUser.subscribe(u => (this.user = u));
      }

      // kept for backwards compatibility
      purgeAuth() {
        // let the effects handle this
        this.store.dispatch(clearUser());
      }

      attemptAuth(type, credentials): Observable<'success'> {
        const route = type === 'login' ? '/login' : '';
        return this.apiService.post('/users' + route, { user: credentials }).pipe(
          map(
            (): 'success' => {
              this.store.dispatch(loadUser());
              return 'success';
            }
          )
        );
      }

      getCurrentUser(): User {
        return this.user;
      }

      // Update the user on the server (email, pass, etc)
      update(user): Observable<User> {
        return this.apiService.put('/user', { user }).pipe(
          map(data => {
            // Will update the currentUser observable - eventually
            this.store.dispatch(loadUser());
            return data.user;
          })
        );
      }
    }
    ```
    - thus we replace the local state in the `user.service` with the store state
    - and the `side-effects` like API calls and local storage tokens clear is now handled by effects
    - `update` and `attemptAuth` should also be delegated to the effects to keep all effects in one place (left as exercise to the reader)

6. Review. See feature/ngrx-user-service branch for help.

### 27. Writing tests for classes using store
Testing with the store See https://ngrx.io/guide/store/testing
  - peculiarity with the store and using setup method: In order to use `provideMockStore` from the testing tools we need to create a module (TestBed.configureTestingModule).
      ```ts
      TestBed.configureTestingModule({ // create the Module
        providers: [ // with providers
          provideMockStore<State>({ // instantiate the mock store in one line
            initialState: {
              [userFeatureKey]: { user: User.empty, loading: false }
            }
          })
        ]
      });
      const store: MockStore<State> = TestBed.get(Store); // now we can get the Store (in this case a MockStore) and provide that in our setup methods
      ```
  - when testing actions we can use the `scannedActions` property of the mock store
  - See [help](files/src/app/core/services/user.service.ngrx.spec.ts.help)
    - [store Test](files\src\app\core\services\user.service.ngrx.spec.ts.help#l19)
    - [actions test](files\src\app\core\services\user.service.ngrx.spec.ts.help#l45)

### 28. The effects test runner
- See https://ngrx.io/guide/effects/testing
- Testing effects is very similar to testing other instances of classes exposing an observable property.
- We need to
  - provide an Observable<Action> (ReplaySubject<Action> seems like a good idea)
      ```ts
      const actions$ = new ReplaySubject<Action>(1);
      ```
  - provide other dependencies if required
  - subscribe to the effect we are testing
  - emit an action via the Observable<Action> we control
  - watch the results
  - watch side effects for Effects that do not dispatch
- For an example see [help](files/src/app/state/user/user.effects.spec.ts.help)
  - the action is a [ReplaySubject](files/src/app/state/user/user.effects.spec.ts.help#l51)
  - emit an [action](files/src/app/state/user/user.effects.spec.ts.help#l17) or [action example two](files/src/app/state/user/user.effects.spec.ts.help#l31)
  - when Effect does not emit check the [side effects](files/src/app/state/user/user.effects.spec.ts.help#l46)


##### E2E tests using store
It would be a very nice facility to our E2E tests if they had access to the Store. As it turns out that's relatively easy:
```ts
  // expose store when run in Cypress
  if ("Cypress" in window) {
    (window as any).__store__ = store;
  }
```
Then later in the tests we can now leverage the store and dispatch actions or get the state.



### Bonus State management task

All 3 HomeComponent, ProfileArticlesComponent, ProfileFavoritesComponent use the articles filter functionality and separately change the filter of the article.
Home toggles between `Feed`, `Global feed` (i.e. latest) and `Tags` in the filter
ProfileArticlesComponent, ProfileFavoritesComponent toggles between `Own` and `Favorites`.

What could be improved - we could store the state in the ArticlesService and only inform it that an event has happened:
`onYourFeedPageEnter` would trigger the initial loading for that page and keep the result in memory.
`onYourFeedAddAuthor` would renew the cache
`onGlobalFeedEnter` would take the articles
`onGlobalFeedSelectPage` would store the selected page in the filter for that - so that we could come back to the same result
..


# Resources

- IntelliJ plugin for snippets https://plugins.jetbrains.com/plugin/8395-angular-2-typescript-live-templates/versions
- great performance talk https://www.youtube.com/watch?v=Tlmx1PbP8Qw
- https://ngrx.io/docs
- https://angular.io/docs

# NOTES

- FormBuilder - inject vs instantiate
  - it's a case of some logic that is really tightly coupled with the UI logic so it makes sense to instantiate the FormBuilder or the FormGroup itself
  - if we inject it and try to mock it - it is a large API surface area i.e. a lot of mocking would be required
  - injecting the actual FormBuilder in the tests is one option
  - not injecting FormBuilder and instantiating it in the component-under-test is another
- AbstractDate - [FooterComponent](./src/app/shared/layout/footer.component.ts) Demo how to use wrappers around the basic DOM functionalities - Date, setTimeout, requestAnimationFrame etc.
- [Done] AuthGuardService to promise (for promise testing) used another promis
- [Done] add a service LogService - error
- [Done] add a service NotifyService - success/info/error. Actually called `NotificationsService`
- talk about CI - Already doing it? AzureDevOps is great for GitHub integration.
- Pusher - Update key in app.module https://dashboard.pusher.com/apps/858014/keys, https://www.pusher.com/docs/channels/getting_started/javascript (UPDATE KEY)
- Why jump from TestBed to setup?
  - control
  - speed (no need to compile components/for services - unneeded)
  - implementation details in tests! (mockReturnValue(of{})) and if we switch the type of response or need some extra stuff - go and change all tests for that
