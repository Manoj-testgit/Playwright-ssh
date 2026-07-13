const {test,expect} = require("@playwright/test")



test.only ("Github testing" ,  async({page}) =>
{
    await page.goto("https://www.crunchyroll.com/");
    await page.waitForLoadState();
    //await expect(page.locator(".erc-anonymous-consent")).toBeVisible();
    //await page.getByRole("button" , {name: "Please be alert to potential"}).click();


});