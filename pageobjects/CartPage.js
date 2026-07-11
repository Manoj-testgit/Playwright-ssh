const {test,expect} = require('@playwright/test');
class CartPage{


    constructor(page,productName)
    {
        this.page =page;
        this.cartProducts = page.locator("div li").first();
        this.selectedProduct = page.locator("h3:has-text('"+productName+"')");
        this.CheckOut = page.locator("text=Checkout");
        

    }

    async CheckoutItem(productName)
    {
        await this.cartProducts.waitFor();
        const bool = await this.selectedProduct.isVisible();
        expect (bool).toBeTruthy();
       
       
    }
    async CheckOutprocess()
    {
         await this.CheckOut.click();

    }
    /*we can also pass the parameter in different method, but creating a method like below
    and calling the method in the checkoutitem method or we can direclt pass the parameter in 
    the constructor 
    Usually only page is sent to the constructor, if that is required then we can used below method


     getProductlocator(productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')")

    }*/
    
    

}
module.exports = {CartPage}; 