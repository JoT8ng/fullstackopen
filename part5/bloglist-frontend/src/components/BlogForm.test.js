import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = container.querySelector('#title')
  const inputAuthor = container.querySelector('#author')
  const inputUrl = container.querySelector('#url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a form...')
  await user.type(inputAuthor, 'test author')
  await user.type(inputUrl, 'url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})