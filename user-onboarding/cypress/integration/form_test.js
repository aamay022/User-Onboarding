describe('User input', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    const firstNameInput = () => cy.get('input[name=first_name]')
    const lastNameInput = () => cy.get('input[name=last_name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsCheckBox = () => cy.get('input[name=terms]')
    const submitBtn = () => cy.get("button[id='submitBtn']");

    it('inputs working', () => {
        firstNameInput().should('exist');
    })
    
    it('filling out inputs', ()=>{
        firstNameInput()
                .should('have.value', '')
                .type('Ant')
                .should('have.value', 'Ant');
        lastNameInput()
                .should('have.value', '')
                .type('Man')
                .should('have.value', 'Man');
        emailInput()
                .should('have.value', '')
                .type('antman@yahoo.com')
                .should('have.value', 'antman@yahoo.com');
        passwordInput()
                .should('have.value', '')
                .type('pickleRick')
                .should('have.value', 'pickleRick');
    })

    it('check if user can check the terms box', ()=>{
        termsCheckBox().check()
        termsCheckBox().should('be.checked')
    })

    it('check if user can submit the form data',()=>{
        firstNameInput()
                .should('have.value', '')
                .type('Ant')
                .should('have.value', 'Ant');
        lastNameInput()
                .should('have.value', '')
                .type('Man')
                .should('have.value', 'Man');
        emailInput()
                .should('have.value', '')
                .type('antman@yahoo.com')
                .should('have.value', 'antman@yahoo.com');
        passwordInput()
                .should('have.value', '')
                .type('pickleRick')
                .should('have.value', 'pickleRick');
        termsCheckBox().check()
        submitBtn().should('not.be.disabled')
        submitBtn().click()
    })
    it('check for form validation if an input is left empty',()=>{
        lastNameInput()
                .should('have.value', '')
                .type('Man')
                .should('have.value', 'Man');
        emailInput()
                .should('have.value', '')
                .type('antman@yahoo.com')
                .should('have.value', 'antman@yahoo.com');
        passwordInput()
                .should('have.value', '')
                .type('pickleRick')
                .should('have.value', 'pickleRick');
        termsCheckBox().check()
        submitBtn().should('be.disabled')
    })
})