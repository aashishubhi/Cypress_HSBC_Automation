const atmData = require('../fixtures/example.json');

describe('HSBC ATM Search Test', () => {

  beforeEach(() => {
    //1. Open https://www.hsbc.co.in/
    cy.visitHSBC();
    });

  it('validates ATM search and social media links', () => {
    // 2. Scroll down to the bottom of the page
    cy.scrollTo('bottom');

    // 3. Click on Find your nearest branch or ATM link in footer section
    cy.get(atmData.atmLinkSelector).click();

    // 4. Validate in new page the URL has String = ‘/ways-to-bank/branches/’
    cy.url().should('include', atmData.expectedAtmUrl);

    // 5. Validate Header as Branches & ATM
    cy.get(atmData.atmHeaderSelector).should('be.visible').should('contain', atmData.expectedAtmHeaderText);

    // 6. Click on before Branch & ATM Locator button
    cy.get(atmData.atmLocatorButtonSelector).click();

    // 7. Type country name as India
    cy.get(atmData.countrySelector).type(atmData.country).invoke('show');

    // 8. In drop-down option click option India
    
    //1st way : where "countryDropdownOptionSelector": "li[@id='PlacesAutocomplete__suggestion-ChIJkbeSa_BfYzARphNChaFPjNc']", 
    //cy.get(atmData.countryDropdownOptionSelector).should('be.visible').should('contain','India').click(); 
    
    //2nd way :
    cy.get('#autocomplete-results li')
    .filter((index, el) => {
        const placeId = Cypress.$(el).attr('place_id'); // Assuming 'data-place-id' attribute holds the place_id
        return placeId === 'ChIJkbeSa_BfYzARphNChaFPjNc'; 
    })
    .click();

    //3rd way: 
    //cy.get(atmData.countryDropdownOptionSelector).should('have.value', atmData.country).click();
    
    // 9. Validate ATM Header name is showing as Rajbhavan Road
    cy.get(atmData.atmHeaderNameSelector).should('be.visible').should('contain', atmData.expectedAtmName);

    // 10. Click on add Show more results button
    cy.get(atmData.showMoreResultsButtonSelector).click();

    // 11. Check second ATM branch name tooltip as 2 in red color is getting displayed
    cy.get(atmData.secondAtmTooltipSelector).should('be.visible').should('contain', atmData.expectedAtmTooltipNumber);

    // 12. 13. 14. 15. Check Instagram, Facebook, Twitter, Youtube in social media option
    cy.get(atmData.socialMediaLinksSelector).each(($el) => {
        atmData.socialMediaOptions
        .forEach(socialMedia => {
          expect($el.text().trim()).to.include(socialMedia); 
        });
      });

    // 16. Click on HSBC Logo
    cy.get(atmData.HSBCBankLogo).click();

    // 17. Validate page is navigating to home page by its title
    cy.title().should('eq', atmData.expectedTitle);

    // 18. Scroll down to the bottom 
    cy.scrollTo('bottom');

    // 19. Check and Click on Privacy link
    cy.get(atmData.privacyLinkSelector).click();

    // 20. Validate Privacy Statement as Header
    cy.get(atmData.privacyStatementHeaderSelector).should('be.visible').and('have.text', atmData.expectedPrivacyStatementHeaderText);

    });
});