const {test,expect} = require("@playwright/test")


test ( "Client webpage practice" ,  async ({page}) => {
 await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");

 const title = page.title();
 console.log(title);
 await expect (page).toHaveTitle ("Let's Shop");

 await page.locator("#userEmail").fill("manojkumarc2994@gmail.com");
 await page.locator("#userPassword").fill("Radeon 123");
 await page.locator("[value='Login']").click();
 await page.waitForLoadState("networkidle");
 await page.locator('.card-body b').first().waitFor();

 const titleitems = await page.locator(".card-body b").allTextContents();
 console.log(titleitems);
 const products = await page.locator('.card-body');

 const count = await products.count();
 const productName = "ZARA COAT 3";


 for (let i=0;i<count; i++)
 {
    if (await products.nth(i).locator("b").textContent() === productName)
    {
        await products.nth(i).locator("text = Add To Cart").click();
        break;

    }
 }

 await page.locator("[routerlink$='/dashboard/cart']").click();
 await page.locator(".heading.cf").waitFor();
 const item = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 expect(item).toBeTruthy();
 await page.locator("text=Checkout").click();

 await page.locator("[placeholder='Select Country']").pressSequentially("ind");
 const options = await page.locator(".ta-results")
 await options.waitFor();
 const optionsCount = await options.locator("button").count();

 for (let i=0; i<optionsCount;i++)
 {
    const text = await options.locator("button").nth(i).textContent();
    if (text ===" India")
    {
        await options.locator("button").nth(i).click()
        break;
    }
}

 await expect (page.locator(".user__name [type='text']").first()).toHaveText("manojkumarc2994@gmail.com");
 await page.locator(".action__submit").click();
 await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

 console.log(orderId);


 await page.locator("[routerlink$='/dashboard/myorders']").first().click();
 await expect(page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
 await page.locator("tbody").waitFor();

 const rows = page.locator("tbody tr");



 for (let i=0; i<await rows.count(); i++)
 {
    const roworderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(roworderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
    
 

});