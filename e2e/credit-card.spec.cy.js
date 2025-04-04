const creditCardData = require('../fixtures/example.json');

describe('HSBC Credit Card Test', () => {
  beforeEach(() => {
    //1. Open https://www.hsbc.co.in/
    cy.visitHSBC();
    });

  it('validates credit card page elements and compare card functionality', () => {
    // 2. Hover cursor on Banking menu navigation
    
    cy.get(creditCardData.bankingMenuSelector).invoke('show').click(); 
    //cy.get(creditCardData.creditCardLinkSelector).should('be.visible'); 
    cy.wait(4000);

    // 3. Click on Credit Cards link
    cy.get(creditCardData.creditCardLinkSelector).contains('Credit Cards').click({force:true});
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })

    // 4. Validate Credit Card as a header text
    cy.get(creditCardData.creditCardHeaderTextSelector).should('be.visible').should('contain', creditCardData.expectedCreditCardHeaderText);

    // 5. Validate Apply Now/'Find the right card for you' button
    cy.get(creditCardData.applyNowButtonSelector).should('be.visible').click();

    cy.wait(1000);

    // 6. Validate number of credit card options (there are 3 types of Credit Card options are available)
    cy.get(creditCardData.creditCardOptionsSelector).should('have.length', creditCardData.expectedNumberOfCards);

    // 7. Validate first credit Card image attribute is Visa Platinum Credit Card
    cy.get(creditCardData.firstCreditCardSelector)
      .find('img')
      .should('have.attr', 'src')
      .and('contain', creditCardData.expectedFirstCardImageSrc);

    // 8. Select the first Card that is Visa Platinum Credit Card
    cy.get(creditCardData.firstCardSelect).click();

    // 9. Select the second Card that is Premier Mastercard Credit-card
    cy.get(creditCardData.secondCardSelect).click();

    // 10. Select the third Card that is live-plus-credit-card
    cy.get(creditCardData.thirdCardSelect).click();

    // 11. Click on Compare button 
    cy.get(creditCardData.CompareButtonSelector).click();

  });
});
    /*// Validate compare card popup
    cy.get(creditCardData.compareCardPopupCloseButtonSelector).should('be.visible');

    // Validate selected cards
    cy.get(creditCardData.selectedCardCountSelector).should('contain', creditCardData.expectedSelectedCards);

    // Validate remove link for each selected card
    cy.get(creditCardData.removeCardLinkSelector).should('have.length', creditCardData.expectedSelectedCards);

    // Validate selected cards again
    cy.get(creditCardData.selectedCardCountSelector).should('contain', creditCardData.expectedSelectedCardsWithThird);

    // Validate remove link for each selected card
    cy.get(creditCardData.removeCardLinkSelector).should('have.length', creditCardData.expectedSelectedCardsWithThird);

    // Remove one card from comparison
    cy.get(creditCardData.removeCardLinkSelector).first().click();

    // Validate updated selected cards
    cy.get(creditCardData.selectedCardCountSelector).should('contain', creditCardData.expectedSelectedCardsAfterRemove);

    // Click on Add Card link again
    cy.get(creditCardData.addCardLinkSelector).click();

    // Close the compare card popup
    cy.get(creditCardData.compareCardPopupCloseButtonSelector).click();

    // Validate popup closure
    cy.get(creditCardData.compareCardPopupSelector);*/

