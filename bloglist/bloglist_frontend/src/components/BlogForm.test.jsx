import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('create blog gets called with correct arguments', async () => {
  const blog = {
    title: 'new blog',
    author: 'jammie',
    url: 'hello.world',
  }

  const mockHandler = vi.fn()
  const player = userEvent.setup()


  render(<BlogForm createNewBlog={mockHandler}/>)

  const titleElement = screen.getByPlaceholderText('enter title')
  const authorElement = screen.getByPlaceholderText('enter author')
  const urlElement = screen.getByPlaceholderText('enter url')

  await player.type(titleElement, blog.title)
  await player.type(authorElement, blog.author)
  await player.type(urlElement, blog.url)

  const createButton = screen.getByText('create')
  await player.click(createButton)

  expect(mockHandler.mock.calls[0][0]).toEqual(blog)
})