const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
    await page.getByPlaceholder('enter username').fill(username)
    await page.getByPlaceholder('enter password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'add Blog' }).click()

    const blog = {
        title,
        author,
        url
    }

    await page.getByPlaceholder('enter title').fill(blog.title)
    await page.getByPlaceholder('enter author').fill(blog.author)
    await page.getByPlaceholder('enter url').fill(blog.url)

    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(title).first().waitFor()
    await page.getByRole('button', { name: 'cancel' }).click()
}

const getBlogDetail = async (page) => {
    const blogElement = await page.getByTestId('blog').first()
    await blogElement.getByRole('button', { name: 'show' }).click()

    const blogDetail = await page.getByTestId('blogDetail')
    return blogDetail
}

const likeBlog = async (blogDetail) => {
    let likeText = blogDetail.getByTestId('like-count')

    const initialLikeText = await likeText.textContent()
    const initialLike = parseInt(initialLikeText.match(/\d+/)[0])

    await blogDetail.getByRole('button', { name: 'like' }).click()
}

module.exports = {
    loginWith,
    addBlog,
    getBlogDetail,
    likeBlog,
}