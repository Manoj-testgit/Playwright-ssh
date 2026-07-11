const { test, expect } = require("@playwright/test")


test ('Cient App logc', async ({page}) =>{
    
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");
    const title = await page.title();
    console.log (title);
    await expect (page).toHaveTitle("Let's Shop");

    await page.getByPlaceholder('email@example').fill("manojkumarc2994@gmail.com");
    await page.getByPlaceholder('enter your passsword').fill("Radeon 123");
    await page.getByRole("button",{name: "Login"}).click();
    await page.waitForLoadState('networkidle');  // wait for the page to load
    await page.locator(".card-body b").first().waitFor(); /*sometimes the above conditions may
    not work so another wait condition for atleast 1st item to load*/

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
    /*above codes shows the selecting an item from the shown list and adding it to the card */

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click(); /*text with 
    CArt is shown 4 times, will need to filter, the parent of it "list item" from the top, 
    that "li" in css*/

    await page.locator("div li").first().waitFor();
    await expect (page.getByText("ZARA COAT 3").toBeVisible()); /*isVisible wont wait for page to load 
    so we are using waitfor above */
    await page.getByRole("button", {name:"Checkout"}).click(); //using generic text for checkout

    await page.getByPlaceholder("Select Country").pressSequentially("ind");/* press sequentially
    is used to type in the less in order to get the sorting list, delay of 150 ms is introduced
    between each key press */
    await page.getByRole("button", {name:"India"}).nth(1).click(); 

    //await page.locator(".icon-credit-card").click(); //did not worl=k

    //await page.locator(".input.ddl").nth(0).selectOption("4");
    //await page.locator(".input.ddl").nth(1).selectOption("15");


    await page.getByPlaceholder("CVV Code ?").first().fill("345");
    await page.getByPlaceholder(".field .input.txtName on Card").fill("Manoj Kumar");

    await expect (page.locator(".user__name [type='text']").first()).toHaveText("manojkumarc2994@gmail.com");
    await page.getByText("PLACE ORDER").click();
    await expect (page.getByText(" Thankyou for the order. ").toBeVisible());
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId);
    
    
    await page.locator("button[routerlink*='myorders']").first().click();
    await expect (page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");


    for (let i=0; i<await rows.count(); i++)
    {
        const roworderId = await rows.nth(i).locator ("th").textContent();
        if (orderId.includes(roworderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



});
