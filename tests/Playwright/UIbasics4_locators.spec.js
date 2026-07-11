const { test, expect } = require("@playwright/test");

test ('Playwright Special locators'  , async  ({page}) =>{


    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel ("Check me out if you Love IceCreams!").click();
    //if any text is written by label tag in css, in the webpage it will search and click on it in the webpage
    await page.getByLabel("Employed").check();
    //check method ensure that the check box or radio element is checked, we can also use click method here 
    await page.getByLabel("Gender").selectOption("Female");
    //selectiption is available only when dropdown in already available to select 
    //getByLable may not work properly with empty box on filling in boxes 
    /* for lable to work on password field, the password for and id should have same label name
    for attribute has "email" and id has "useremail, then lable locator wont work*/

    await page.getByPlaceholder("Password").fill("Abc123");
    //If we see placeholder attribute in the css, we can use placeholfer method, if there is no placeholder 
    // attribute we cannot use it 

    await page.getByRole("button",{name:'Submit'}).click();
    //the button should have button tag in css or should have class that has "btn"

    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    //checking for the text shown on the page

    await page.getByRole("link",{name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
    //if we have multiple option to select, if they have a same tag name in css, we can use it in the 
    // normal locator and apply filter to select the item we need use text (works like getbytext method)















});