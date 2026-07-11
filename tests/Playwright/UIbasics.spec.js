const {test, expect} = require('@playwright/test')

test ('Browser context playwright', async ({browser}) =>

    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/");


    });

test ('Page context Playwright', async ({page}) =>
    {

       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

       const title = await page.title();
       console.log ('Page is ' +title);
       const userName = page.locator('#username');
       const signIn = page.locator("#signInBtn");
       const cardTitles = page.locator(".card-body a");

       await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

       await page.locator('#username').fill("Rahul Shetty");
       await page.locator('#password').fill("Learning@830$3mK2");
       await page.locator("#signInBtn").click();
       console.log(await page.locator("[style*='block']").textContent());
       await expect (page.locator("[style*='block']")).toContainText('Incorrect');

       await userName.fill("");
       await userName.fill("rahulshettyacademy");
       await signIn.click();
       console.log (await page.locator(".card-body a").first().textContent());
       console.log (await page.locator(".card-body a").nth(1).textContent());

       console.log (await page.locator(".card-body a").allTextContents());

    });

test ('gogle page', async ({page}) =>
{
    await page.goto("https://www.google.com/");

    const title2 = await page.title();
    console.log("Test case is " +title2);

    await expect(page).toHaveTitle("Google");
});
test ('Youtube Validation', async ({page}) =>
{
    await page.goto ("https://www.youtube.com/");

    const title3 = await page.title();
    console.log("Page is "+title3);
    await expect(page).toHaveTitle ('YouTube');

});
test ('Facebook Validation', async ({page}) =>
{   
    await page.goto ("https://www.facebook.com/");
    const title4 = await page.title();
    console.log("Page name is " +title4);
    await expect (page).toHaveTitle('Facebook');

});

test ('Playstation page validation', async ({page}) =>
{
    await page.goto("https://www.playstation.com/en-in/ps5/ps5-features/");
    const title4 = await page.title();
    console.log("Page title is " +title4);
    await expect (page).toHaveTitle('PS5 features | Discover new ways to play on PlayStation 5');

});


