/* global cy */

describe('JournalApp', function() {
    it('loginpage can be opened', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login');
        cy.contains('Crear una cuenta');
    })
})