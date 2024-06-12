describe("tasks page test.", () => {
  beforeEach(() => {
    cy.fixture("userExample.json").as("usersData");
    cy.fixture("todoExample.json").as("tasksData");
    cy.visit("localhost:3000/");
    cy.get('[data-cy="button-start-page"]').click();
    cy.url().should("equal", "http://localhost:3000/auth");
    cy.clock();
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
    cy.get("@tasksData").then((tasks) => {
      cy.get("#task-title-input").click().type(`tasks.task1.title{enter}`);
    });
  });
  it("should add a new task", () => {});
});
