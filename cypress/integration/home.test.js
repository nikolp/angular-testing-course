


describe('Home Page', () => {

    beforeEach(() => {

        cy.fixture('courses.json').as("coursesJSON");

        cy.server();

        cy.route('/api/courses', "@coursesJSON").as("courses");

        cy.visit('/');

    });

    it('should display a list of courses', () => {

        cy.contains("All Courses");

        cy.wait('@courses');

        cy.get("mat-card").should("have.length", 9);

    });

    it('should display the advanced courses', () => {

        cy.wait('@courses');

        cy.get('.mdc-tab').should("have.length", 2);

        cy.get('.mdc-tab').last().click();

        const titles_selector = '.mat-mdc-tab-body-wrapper mat-card-title';
        let card_titles = cy.get(titles_selector);
        card_titles.its('length').should('be.gt', 1);

        // due to animation or other re-rendering we need some wait
        // otherwise cypress complains we have found a node which is detached from DOM
        cy.wait(5000);

        card_titles = cy.get(titles_selector);
        card_titles.first().should('contain', "Angular Security Course");
    });


});






















