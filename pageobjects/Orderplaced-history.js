const {expect} = require('@playwright/test');

class Orderplacedandhistory
{
    constructor(page)
    {
        this.page = page;
        this.finalHeader = page.locator(".hero-primary");
        this.orderIdnumber = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myorder = page.locator("button[routerlink*='myorders']").first();
        this.yourOrderHeader = page.locator("h1.ng-star-inserted");

    }


    async orderPlaced(page)
    {


        await expect (this.finalHeader).toHaveText(" Thankyou for the order. ");
            const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        
            console.log(orderId);
            
            
            await this.myorder.click();
            await expect (this.yourOrderHeader).toHaveText("Your Orders");
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
        

    }
}

module.exports = {Orderplacedandhistory};