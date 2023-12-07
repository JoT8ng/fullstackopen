import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import updateLikes from './Blog'
import removeBlog from './Blog'

describe(('renders blog content'), () => {
  test('renders author and title', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'jo',
      url: 'www.test.com',
      likes: 7
    }

    const { container } = render(<Blog blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />)

    const info = container.querySelector('#blog-title-author')
    expect(info.textContent).toBe('Component testing is done with react-testing-library joshow')
  })

  test('renders url and likes', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'jo',
      url: 'www.test.com',
      likes: 7
    }

    const { container } = render(<Blog blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    user.click(button)

    const url = container.querySelector('#blog-url')
    const likes = container.querySelector('#blog-likes')
    expect(url.textContent).toBe('www.test.com')
    expect(likes.textContent).toBe('7like')
  })
})

describe(('test button calls'), () => {
  test('clicking the likes button twice calls event handler twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'jo',
      url: 'www.test.com',
      likes: 7
    }

    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} updateLikes={mockHandler} />
    )

    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})