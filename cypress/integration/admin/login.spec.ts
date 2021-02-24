describe("Login Tests", () => {
  const { username, password } = require("../../fixtures/admin-creds.json")
  beforeEach(() => cy.visit("/login"))

  it("Logs in with valid credentials", () => {
    cy.login(username, password)
    cy.url().should("include", "dashboard")
  })

  it("Logs in with wrong password", () => {
    cy.login(username, 12345)
    cy.get(".chakra-alert__desc")
  })

  it("Logs in with wrong username", () => {
    cy.login("anotherUser", password)
    cy.get(".chakra-alert__desc")
  })
})
