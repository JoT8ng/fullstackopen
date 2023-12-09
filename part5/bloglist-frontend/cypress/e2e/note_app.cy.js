describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    const user = {
      name: 'root',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.visit('')
    cy.contains('Blogs')
  })

  it('login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
  })

  it('login fails with wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('random')
    cy.get('#password').type('pass')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')

    cy.get('html').should('not.contain', 'random logged in')
  })

  it('login succeeds with correct credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('root logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('a new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.blogcypress.com')
      cy.contains('create').click()

      cy.contains('Blog added successfully!')
      cy.contains('a blog created by cypress cypress').should('exist')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'sekret' })
        cy.createBlog({
          title: 'blog cypress one',
          author: 'jo',
          url: 'www.cypresstest.com',
          likes: 4
        })
        cy.createBlog({
          title: 'blog cypress two',
          author: 'jo',
          url: 'www.cypresstest.com',
          likes: 5
        })
        cy.createBlog({
          title: 'blog cypress three',
          author: 'jo',
          url: 'www.cypresstest.com',
          likes: 6
        })
      })

      it('it can be liked', function () {
        cy.contains('blog cypress one')
        cy.contains('show').click()

        cy.contains('like').click()
        cy.contains('5like')

        cy.contains('blog cypress two')
        cy.contains('show').click()
        cy.contains('like')
      })

      it('blog can be deleted by user who created', function () {
        cy.contains('blog cypress three')
        cy.contains('show').click()
        cy.contains('Delete').click()

        cy.contains('Blog deleted successfully!')

        cy.get('html').should('not.contain', 'blog cypress three')
      })

      it('blogs are ordered  by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'blog cypress three')
        cy.get('.blog').eq(2).should('contain', 'blog cypress one')
      })
    })
  })
})