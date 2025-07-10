import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
  title: 'this will get rendered',
  author: 'renderkun',
  url: 'https://google.com',
  likes: 50,
  user: {
    username: 'wolfie',
  }
}

const user = {
  name: 'wolf',
  username: 'wolfie',
  token: 'should not be needed',
}

test('by default only title and author gets rendered', () => {
  render(<Blog user={user} blog={blog} />)

  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText('likes')

  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('clicking button shows url and likes', async () => {
  render(<Blog user={user} blog={blog} />)

  const player = userEvent.setup()
  const button = screen.getByText('show')

  await player.click(button)

  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText('likes', { exact: false })

  expect(url).not.toBeNull()
  expect(likes).not.toBeNull()
})
