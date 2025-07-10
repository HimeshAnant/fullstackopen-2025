const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Wolf',
                username: 'wolfie',
                password: 'zebbito'
            }
        })

        await request.post('/api/users', {
            data: {
                name: 'zelda',
                username: 'zelda09',
                password: 'greatest'
            }
        })

        await page.goto('/')
    })

    test('front page is login page by default', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credential', async ({ page }) => {
            await helper.loginWith(page, 'wolfie', 'zebbito')
            await expect(page.getByText('wolf logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await helper.loginWith(page, 'wolfie', 'fakeLife101')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, 'wolfie', 'zebbito')
        })

        test('can create blog', async ({ page }) => {
            await helper.addBlog(page, 'hehe', 'hoho', 'google.comm')
            await expect(page.getByText('hehe hoho')).toBeVisible()
        })

        describe('a blog exists', () => {
            beforeEach(async ({ page }) => {
                await helper.addBlog(page, 'first sould', 'kindred one', 'google.com')
            })

            test('blog can be liked', async ({ page }) => {
                const blogDetail = await helper.getBlogDetail(page)
                await helper.likeBlog(blogDetail)
                await expect(blogDetail.getByText('likes: 1')).toBeVisible()
            })

            test('blog can be deleted', async ({ page }) => {
                const blogDetail = await helper.getBlogDetail(page)

                page.on('dialog', dialog => dialog.accept())
                await blogDetail.getByRole('button', { name: 'remove' }).click()

                await expect(page.getByTestId('blog')).not.toBeVisible()
            })
        })

        describe('multiple blogs exists', () => {
            beforeEach(async ({ page }) => {
                await helper.addBlog(page, 'three', 'wolf', 'google.com')
                await helper.addBlog(page, 'two', 'wolf', 'google.com')
                await helper.addBlog(page, 'one', 'wolf', 'google.com')

                for (let i=0; i<3; ++i) {
                    await page.getByRole('button', { name: 'show' }).first().click()
                    await page.getByTestId('blogDetail').nth(i).waitFor()
                }

                const blogDetails = await page.getByTestId('blogDetail').all()
            })

            test('blogs are sorted by likes', async ({ page }) => {
                let blogDetails = await page.getByTestId('blogDetail').all()
                await helper.likeBlog(blogDetails[2])

                blogDetails = await page.getByTestId('blogDetail').all()

                let blogLikes = []
                for (let blogDetail of blogDetails) {
                    const likesText = await blogDetail.getByText(/likes:/).textContent()
                    const likes = parseInt(likesText.match(/\d+/)[0])

                    blogLikes = blogLikes.concat(likes)
                }

                const sortedBlogLikes = blogLikes.sort()
                expect(blogLikes).toEqual(sortedBlogLikes)
            })
        })
    })

    describe('more than one users have blogs', () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, 'wolfie', 'zebbito')
            await helper.addBlog(page, 'wolfie\'s first blog', 'wolf', 'google.com')
            await page.getByRole('button', { name: 'logout' }).click()

            await helper.loginWith(page, 'zelda09', 'greatest')
            await helper.addBlog(page, 'zelda\'s first blog', 'zelda', 'yahoo.com')
        })

        test('remove is not visible for other\'s blog', async ({ page }) => {
            const blogDetail = await helper.getBlogDetail(page)
            await expect(blogDetail.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
})