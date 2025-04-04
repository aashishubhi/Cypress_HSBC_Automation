const loginData = require('../fixtures/example.json');

describe('HSBC Login Test Suite', function () {

    beforeEach(() => {
      //1. Open https://www.hsbc.co.in/
      cy.visitHSBC();
      });

    it('validates login page elements and behavior', function () {
        
        // 2. Validate HSBC Bank Logo
        cy.get(loginData.HSBCBankLogo).should('be.visible');

        // 3. Validate Home Page Title
        cy.title().should('eq', loginData.expectedTitle);

        // 4. Click on Login button
        cy.get(loginData.loginButtonSelector).click();

        // 5. Validate Log On header in Login page
        cy.get(loginData.loginHeaderTextSelector).should('be.visible');

        // 6. Check Continue button is available
        cy.get(loginData.continueButtonSelector).should('be.visible');

        // 7. Also validate initially Continue button is disabled.
        cy.get(loginData.continueButtonSelector).should('be.disabled');
        
        // 8. Type any random email in the username field
        cy.get(loginData.usernameSelector).type(loginData.randomEmail);

        // 9. Now check Continue button is Enabled
        cy.get(loginData.continueButtonSelector).should('be.enabled');

        // 10. Validate Remember me check box is not checked by default
        cy.get(loginData.rememberMeCheckboxSelector).should('not.be.checked');

        // 11. Validate there is a question mark tooltip present on the page
        cy.get(loginData.usernameTooltipSelector).should('be.visible');

        // 12. Click on the tooltip
        cy.get(loginData.usernameTooltipSelector).click();

        // 13. Now validate the username header in the new pop-up screen
        cy.get(loginData.usernamePopupHeaderTextSelector).should('be.visible');

        // 14. Validate there is a Close button in the new pop-up screen
        cy.get(loginData.usernamePopupCloseButtonSelector).should('be.visible');

        // 15. Click on the close button present in the new pop-up screen
        cy.get(loginData.usernamePopupCloseButtonSelector).click(); 

    });
  });