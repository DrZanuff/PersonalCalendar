describe('Calendar App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should load the calendar page', () => {
    cy.contains('Personal Calendar').should('exist')
  })

  it('should allow adding an event', () => {
    cy.get('div[data-testid="test-id-1"]').click()
    cy.get('div[data-testid="form-event-title"] input').type('Meeting')
    cy.get('div[data-testid="form-event-city"] input').type('New York')
    cy.get('div[data-testid="form-event-time"] input').type('12:00')
    cy.contains('Save Event').click()
    cy.contains('Meeting').should('exist')
  })
})
