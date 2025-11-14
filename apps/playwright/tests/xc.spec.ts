import { expect, test } from '@playwright/test'

test('has xc title', async ({ page }) => {
    await page.goto('http://localhost:3001/app/layout', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    })
    await expect(page).toHaveTitle(/XC vBuilder/)
})

test('has xc vbuilder', async ({ page }) => {
    await page.goto('http://localhost:3001/app/layout/')

    await expect(page.getByRole('main').getByRole('heading', { name: 'XC vBuilder' })).toHaveText(
        'XC vBuilder'
    )
})
