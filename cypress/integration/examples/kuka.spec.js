describe('My First Test', function () {
    // it('Visits the example!', function () {
    //     cy.visit('https://example.cypress.io');
    //     cy.contains('type').click();
    //     cy.url().should('include', '/commands/actions');
    //     cy.get('.action-email')
    //       .type('fake@email.com')
    //       .should('have.value', 'fake@email.com');
    // })
    
    it('Visits the control stadio!', function () {
        cy.visit('/');
        cy.get('#mat-input-0').click();
        // cy.pause();
        cy.get('#mat-input-0')
          .type('super')
          .should('have.value', 'super');
        cy.get('#mat-input-1')
          .type('1-super99')
          .should('have.value', '1-super99');
        cy.get('.mat-raised-button').click();
        cy.get('[aria-describedby="cdk-describedby-message-11"] > .mat-icon').click();
        cy.get('.mat-snack-bar-container .mat-button').click();
        cy.contains('#Apps');
    })
})