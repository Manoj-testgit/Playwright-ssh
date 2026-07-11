const {test, expect} = require('@playwright/test');
const { title } = require('node:process');


test ('Rahul shetty practices',  async ({page}) =>

{
    await page.goto("https://rahulshettyacademy.com/client");
    const title = await page.title();

    console.log('Page tile is ' +title);

    await expect (page).toHaveTitle("Let's Shop");


    await page.locator ("#userEmail").fill("manojkumarc2994@gmail.com")
    await page.locator ("#userPassword").fill("Radeon 123");
    await page.locator ("[value='Login']").click();
    /*await page.waitForLoadState('networkidle'); /* wait for the network calls to finish,
    since the contents on screen depends on the data loaded on screen, sometimes this may 
    not work due to flakiness*/
    await page.locator (".card-body b").first().waitFor(); /*works only when there is sinfge element
    since there are multple elements to be returned this directly may not work, hence 
    mention single element condition or first or last element condition */

    const titles = await page.locator (".card-body b").allTextContents();
    console.log(titles);

});

