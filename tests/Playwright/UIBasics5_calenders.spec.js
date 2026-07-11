const {test,expect} = require("@playwright/test");
const { doesNotThrow } = require("node:assert");


test ("Calender Validation" , async ({page})=> {

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    /*const title = await page.title();
    await expect (page).toHaveTitle("GreenKart - veg and fruits kart");

    await page.getByText("Top Deals").click();*/

    const monthNumber = "6";
    const Date = "17";
    const Year = "2027";

    const expectedlist = [monthNumber, Date, Year]; //created an array for this 


    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(Year).click();
    await page.locator(".react-calendar__tile").nth(Number(monthNumber-1)).click();
    await page.locator("//abbr[text()='"+Date+"']").click();

    const inputs =  page.locator(".react-date-picker__inputGroup__input"); /*Selecting a commom
    CSS so that it cover all the 3 items needed, month ,data and year*/

    for (let i=0; i<expectedlist.length; i++)
    {
        const value = await inputs.nth(i).inputValue() /*we cannot use getthattext since it is not static, we have dynamically
        addded the value to the element */

        expect(value).toEqual(expectedlist[i]);
        
    }

});
