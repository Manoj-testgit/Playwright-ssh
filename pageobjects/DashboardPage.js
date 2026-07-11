class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink$='/dashboard/cart']");
    }


async searchProductAddtoCart(productName)
{



    const titles = await this.productsText.allTextContents();
    console.log(titles);

    const count = await this.products.count();
    for (let i=0; i<count; i++ ) //logic to find the item
    {
        if (await this.products.nth(i).locator("b").textContent() === productName) //checking for item with productname
        {
            await this.products.nth(i).locator("text= Add To Cart").click();// after finding item, adding it to the card 
            break;
            //chaining 

        }
    }
}

async navigateToCart()
{
     await this.cart.click();
}
}

module.exports = {DashboardPage};
