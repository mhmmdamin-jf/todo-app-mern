/// <reference types="Cypress"/>

describe("authentication test.", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.fixture("userExample.json").as("usersData");
    cy.visit("localhost:3000/");
    cy.get('[data-cy="button-start-page"]').click();
    // cy.url().should("equal", "http://localhost:3000/auth");
    cy.visit("http://localhost:3000/auth");
    cy.clock();
  });
  it("should signed up in by entering some data and click 'Done' button.", () => {
    cy.get("@usersData").then((usersData) =>
      cy.get("#input-userName").click().type(usersData.user1.userName)
    );
    cy.get("#button-next").click();
    cy.get("@usersData").then((usersData) => {
      cy.get("#input-password").click().type(usersData.user1.password);
      cy.get("#input-confirm-password").click().type(usersData.user1.password);
    });
    cy.get("#button-done").click();
    cy.setCookie("jwt", "something");
    cy.visit("http://localhost:3000/tasks/today");
    cy.tick(200);
    cy.url().should("equal", "http://localhost:3000/tasks/today");
  });
  it("should signedin by  entering some data and click 'Done' button.", () => {
    cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    cy.get("@usersData").then((usersData) =>
      cy.get("#input-userName").click().type(usersData.user1.userName)
    );
    cy.get("#button-next").click();
    cy.get("@usersData").then((usersData) => {
      cy.get("#input-password").click().type(usersData.user1.password);
    });
    cy.get("#button-done").click();
    cy.setCookie("jwt", "something");
    cy.visit("http://localhost:3000/tasks/today");
    cy.tick(200);
    cy.url().should("equal", "http://localhost:3000/tasks/today");
  });
});
