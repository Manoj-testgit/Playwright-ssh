const {test,expect} = require("@playwright/test")


test("Screenshot & Visual testing", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    /*await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    ^above code just to check the forward and backward flow*/

    await expect(page.locator ("#displayed-text")).toBeVisible();
    await page.getByPlaceholder("Hide/Show Example").screenshot({path: 'partialscreenshot.png'});
    //screenshot on locator level
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    //screenshot on page level 
    await expect(page.locator("#displayed-text")).toBeHidden();


});

test('Visual Testing', async({page}) =>
{
     /* If there was screenshot taken on first day and then screenshot taken on 5th day
    we can use playwright to see if there was a change in position - visual testing  */
    await page.goto("https://kite.zerodha.com/");
    await page.waitForLoadState();
    expect (await page.screenshot()).toMatchSnapshot('landing.png',{maxDiffPixelRatio: 0.05 });
    /*screenshot taken from on first try fails, and page assigns it as the first landing page,
    the screenshot taken on 2nd run compares with first run and comes to a conclusion, 
    even the slighest change can fail the test*/

    //we use this command to update smapshots -> npx playwright test --update-snapshots

});

